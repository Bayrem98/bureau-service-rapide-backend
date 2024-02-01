import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from 'src/admin/admin.service';
import { ClientService } from 'src/client/client.service';
import { OuvrierService } from 'src/ouvrier/ouvrier.service';

@Injectable()
// "implements" guide us how to put together an interceptor
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private adminService: AdminService,
    private clinetService: ClientService,
    private ouvrierService: OuvrierService,
  ) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.adminService.findOne(userId);
      // we need to pass this down to the decorator. SO we assign the user to request because req can be retrieved inside the decorator
      // ------THIS IS WHAT YOU WANTED--------
      request.currentUser = user;
    }
    // run the actual route handler
    return handler.handle();
  }

  async interceptc(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.clinetService.findOne(userId);
      // we need to pass this down to the decorator. SO we assign the user to request because req can be retrieved inside the decorator
      // ------THIS IS WHAT YOU WANTED--------
      request.currentUser = user;
    }
    // run the actual route handler
    return handler.handle();
  }

  async intercepto(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (userId) {
      const user = await this.ouvrierService.findOne(userId);
      // we need to pass this down to the decorator. SO we assign the user to request because req can be retrieved inside the decorator
      // ------THIS IS WHAT YOU WANTED--------
      request.currentUser = user;
    }
    // run the actual route handler
    return handler.handle();
  }
}
