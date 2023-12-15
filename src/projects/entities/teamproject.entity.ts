import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne, } from 'typeorm';

import { Project } from './project.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Teamproject {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  startDate: string;

  @Column({ type: 'varchar', nullable: true })
  endDate: string;

  @Column()
  idUserTeam: number;

  @Column()
  status: string;

  @ManyToOne(() => Project, project => project.teamprojects)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  
 
  @ManyToMany(() => Task, task => task.teamproject,{cascade:true})
  task: Task[];
}
