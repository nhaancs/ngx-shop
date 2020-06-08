export class Category {
    key: string
    name: string

    static fromResponse(data: Partial<Category>): Category {
        let model = new Category()
        Object.assign(model, data)

        return model
    }

    static toCreateRequest(data: Category): any {
        let model: any = {}
        model.name = data.name
        return model
    }
}