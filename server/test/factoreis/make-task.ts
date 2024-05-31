import { Task, TaskProps } from '@/Domain/application/entities/task'
import { Description } from '@/Domain/application/entities/valueObject/description'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

type Override = Partial<TaskProps>

export function MakeTask(override: Override = {}) {
  return Task.create({
    userId: new UniqueEntityId(),
    title: 'Gravação de aula',
    description: new Description(
      'Tarefa para gravar aula de Tasks do Curso de Nestjs',
    ),
    priority: 'Alta',
    startAt: new Date('31/10/2024'),
    endAt: new Date('04/11/2024'),
    ...override,
  })
}