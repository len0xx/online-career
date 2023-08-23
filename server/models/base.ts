import type { FindOptions, Model, ModelStatic, UpdateOptions } from 'sequelize'
import type { Attributes, WhereAttributeHashValue } from 'sequelize/types'
import type { Col, Fn, Literal, MakeNullishOptional } from 'sequelize/types/utils'

type UpdateFields<T extends Model> = { [key in keyof Attributes<T>]?: Fn | Col | Literal | Attributes<T>[key] }

abstract class BaseService<ModelClass extends Model, ModelInterface extends MakeNullishOptional<ModelClass['_creationAttributes']>> {
    protected model: ModelStatic<ModelClass>

    async get(options?: FindOptions) {
        return await this.model.findAll(options)
    }

    async getById(id: number) {
        return await this.model.findByPk(id)
    }

    async create(entity: ModelInterface) {
        return await this.model.create(entity)
    }

    async count(options?: FindOptions) {
        return await this.model.count(options)
    }

    async delete(options: FindOptions<ModelClass & { id: number }>) {
        return await this.model.destroy(options)
    }

    async deleteById(id: WhereAttributeHashValue<Attributes<ModelClass>['id']>) {
        return await this.delete({ where: { id } })
    }

    async update(options: UpdateOptions<ModelClass & { id: number }>, entity: UpdateFields<ModelClass>) {
        return await this.model.update(entity, options)
    }

    async createOrUpdate(options: UpdateOptions<ModelClass & { id: number }>, entity: UpdateFields<ModelClass> | ModelInterface) {
        const count = await this.count(options)

        if (count) {
            return await this.update(options, entity)
        }

        return await this.create(entity as ModelInterface)

    }

    async updateById(id: WhereAttributeHashValue<Attributes<ModelClass>['id']>, entity: UpdateFields<ModelClass>) {
        return await this.update({ where: { id } }, entity)
    }
}

export default BaseService

