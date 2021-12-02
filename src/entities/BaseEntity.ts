import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export abstract class BaseEntity {
	@PrimaryColumn()
	id: string

	@CreateDateColumn()
	createdAt?: Date

	@UpdateDateColumn()
	updatedAt?: Date

	constructor() {
		if (!this.id) {
			this.id = uuid()
		}
	}
}
