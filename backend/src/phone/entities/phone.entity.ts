import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '+55' })
  ddi: string;

  @Column()
  ddd: string;

  @Column()
  number: string;

  @ManyToOne(() => User, (user) => user.phones, { onDelete: 'CASCADE' })
  user: User;
}
