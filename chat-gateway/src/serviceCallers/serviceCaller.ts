import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Method, RawAxiosRequestHeaders } from 'axios';
import { ServiceCallerException } from '../common/errors';

@Injectable()
export default class ServiceCaller implements OnApplicationShutdown {
  onApplicationShutdown() {
    this.logger.log('Graceful shutdown started');
    return new Promise((resolve) => {
      setTimeout(async () => {
        this.logger.log('Graceful shutdown finished');
        resolve(true);
      }, this.configService.get<number>('WAIT_BEFORE_SERVICE_STOP'));
    });
  }

  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private readonly microserviceUrls =
    this.configService.get('microserviceUrls');

  private readonly logger = new Logger(ServiceCaller.name);

  async request(
    microService: string,
    method: Method,
    path: string,
    data: Object = {},
    params: Object = {},
    headers: RawAxiosRequestHeaders = {},
    timeout: number = undefined,
  ) {
    this.logger.debug(
      `Service Caller: ${JSON.stringify({
        url: this.microserviceUrls[microService] + path,
        microService,
        path,
      })}`,
    );

    try {
      const response = await this.httpService
        .request({
          method,
          data,
          params,
          timeout,
          url: this.microserviceUrls[microService] + path,
          headers,
        })
        .toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(
        JSON.stringify({
          message: 'Unexpected service caller error',
          microService,
          method,
          path,
          data,
          params,
          headers,
          timeout,
          error,
        }),
      );
      throw new ServiceCallerException(
        error.response.data?.message ||
          error.message ||
          'Service caller error occurred.',
      );
    }
  }
}
