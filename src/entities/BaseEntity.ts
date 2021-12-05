import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export abstract class BaseEntity {
	@PrimaryColumn()
	id: string

	@CreateDateColumn({ name: 'created_at' })
	createdAt?: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt?: Date

	constructor() {
		if (!this.id) {
			this.id = uuid()
		}
	}
}
