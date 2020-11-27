import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('jsonb')
  pokemons: [{
    pokeId: number;
    name: string;
    height: number;
    weight: number;
    sprite: string;
    abilities: Object;
    stats: Object;
    type: Object;
  }]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }
}

export default User;
