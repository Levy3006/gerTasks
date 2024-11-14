import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  // Essa função Envia todas as tasks atuais no banco de dados pro controller
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Função que pega uma task especifica
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    return task;
  }

  async create(title: string, description: string): Promise<Task> {
    const newTask = this.taskRepository.create({ title, description });
    return await this.taskRepository.save(newTask);
  }

  async update(
    id: number,
    title: string,
    description: string,
    status: 'pending' | 'finished',
  ): Promise<Task> {
    const task = await this.findOne(id);
    task.title = title;
    task.description = description;
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}
