import { TaskRepository } from '@/Domain/application/repositories/task-repository'
import { PrismaService } from '@/infra/databases/prisma/prisma.service'
import { Task } from '@/Domain/application/entities/task'
import { MapperTask } from '@/infra/databases/prisma/mappers/mapper-task'
import { Injectable } from '@nestjs/common'
@Injectable()
export class TaskRepositoryPrisma implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: Task): Promise<void> {
    const raw = MapperTask.toPrisma(task)

    await this.prisma.task.create({
      data: raw,
    })
  }

  async findById(taskId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    })

    if (!task) {
      return null
    }

    return MapperTask.toDomain(task)
  }

  async findManyTaskSearch(title: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    })

    if (!tasks) {
      return null
    }

    return tasks.map(MapperTask.toDomain)
  }

  async findAll(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
    })

    return tasks.map(MapperTask.toDomain)
  }
}
