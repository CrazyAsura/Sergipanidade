import { Phone } from 'src/phone/entities/phone.entity';
import { Address } from 'src/address/entities/address.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // Don't return password by default
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Phone, (phone) => phone.user)
  phones: Phone[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];
}
