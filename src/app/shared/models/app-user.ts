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
        // this line is for demo pupose only
        // in realife you need to set admin role manually
        // model.isAdmin = true
        return model
    }

    static fromResponse(data): AppUser {
        let model = new AppUser() 
        Object.assign(model, data)

        return model
    }
}