export const getUsers = {
    tags: ['Users'],
    description: "Returns all users from the system that the user has access to",
    operationId: 'getUsers',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of pets.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            pet_name: {
                                type: 'string',
                                description: 'Pet Name'
                            },
                            pet_age: {
                                type: 'string',
                                description: 'Pet Age'
                            }
                        }
                    }
                }
            }
        }
    }
}