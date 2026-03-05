import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { ProgramModule } from './program/program.module';

@Module({
    imports: [DepartmentModule, ProgramModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}