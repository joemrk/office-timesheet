import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeormEntyti,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeormEntyti {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
