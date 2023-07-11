import { Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  statusString: () => string;

  constructor(private readonly health: HealthCheckService) {
    this.statusString = () => 'ok';
  }

  public healthCheck(): { time: number; status: string } {
    return { time: Date.now(), status: this.statusString() };
  }

  public liveness() {
    return this.health.check([]);
  }

  public readiness() {
    return this.health.check([]);
  }
}
