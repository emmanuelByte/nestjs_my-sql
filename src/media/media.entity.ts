import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum MediaType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MediaType })
  @IsEnum(MediaType)
  type: MediaType;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  url: string;

  @Column({ default: 'Active' })
  @IsEnum(['Active', 'Inactive'])
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
