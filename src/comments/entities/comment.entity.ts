import { Column, Entity,  ManyToOne,JoinColumn} from 'typeorm';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Comment {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  comment: string;
  @Column()
  email:string;
  
  @ManyToOne(()=>Task, task=> task.comment)
  @JoinColumn({name:'taskId'})
  task: Task;

  

  

  
  
}