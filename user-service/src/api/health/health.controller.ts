import { HealthCheck } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @HealthCheck()
  @Get()
  health() {
    return this.healthService.healthCheck();
  }

  @HealthCheck()
  @Get('readiness')
  readiness() {
    return this.healthService.readiness();
  }

  @HealthCheck()
  @Get('liveness')
  liveness() {
    return this.healthService.liveness();
  }
}
