import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.taskService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    return await this.taskService.create(title, description);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: 'pending' | 'finished',
  ) {
    return await this.taskService.update(
      Number(id),
      title,
      description,
      status,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.delete(Number(id));
  }
}
