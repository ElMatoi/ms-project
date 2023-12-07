import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne,OneToMany } from 'typeorm';

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

  @ManyToOne(() => Project, project => project.teamprojects)
  @JoinColumn({ name: 'projectId' })
  project: Project;

}
