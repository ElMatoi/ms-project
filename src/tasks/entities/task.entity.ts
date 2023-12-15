import { Column, Entity,  ManyToOne,JoinColumn} from 'typeorm';

import { Teamproject } from 'src/projects/entities/teamproject.entity';


@Entity()
export class Task {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;
  @Column()
  iduserCharge: number;
  @Column()
  iduserCreator: number;
  @Column({ length: 500 })
  description: string;
  @Column({ type: 'varchar', nullable: true })
  startDate: string;
  @Column({ type: 'varchar', nullable: true })
  endDate: string;
  @Column({ length: 500 })
  state: string;
  @Column({ length: 500 })
  comment: string;

  

  @ManyToOne(()=>Teamproject, teamproject=> teamproject.task)
  @JoinColumn({name:'teamProjectId'})
  teamproject: Teamproject;

  
}
