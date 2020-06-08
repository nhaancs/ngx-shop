export class AppUser {
    key: string
    name: string
    email: string
    // this field is set manually on Firebase
    isAdmin: boolean

    /**
     * Convert to model that can be sent to firebase
     */
    static toRequest(data: any): Partial<AppUser> {
        let model: any = {}
        model.name = data.displayName
        model.email = data.email
        return model
    }

    static fromResponse(data): AppUser {
        let model = new AppUser() 
        Object.assign(model, data)

        return model
    }
}