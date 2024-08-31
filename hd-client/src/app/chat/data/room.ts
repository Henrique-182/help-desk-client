export const RoomsList = [
    {
        id: 1,
        code: 12345,
        fk_user_customer: 1,
        fk_user_employee: 2,
        fk_sector: 1,
        messages: [
            {
                id: 1,
                fk_room: 1,
                fk_user: 1,
                content: 'Hello World',
                sent_datetime: new Date()
            },
            {
                id: 2,
                fk_room: 1,
                fk_user: 2,
                content: 'Olá, seja bem-vindo!',
                sent_datetime: new Date()
            },
            {
                id: 3,
                fk_room: 1,
                fk_user: 2,
                content: 'Me chamo Usuário',
                sent_datetime: new Date()
            }
        ]
    },
    {
        id: 2,
        code: 543,
        fk_user_customer: 3,
        fk_user_employee: 2,
        fk_sector: 1,
        messages: [
            {
                id: 4,
                fk_room: 2,
                fk_user: 3,
                content: 'Hello World',
                sent_datetime: new Date()
            },
            {
                id: 5,
                fk_room: 2,
                fk_user: 3,
                content: 'Olá, seja bem-vindo!',
                sent_datetime: new Date()
            },
            {
                id: 6,
                fk_room: 2,
                fk_user: 2,
                content: 'Me chamo Usuário',
                sent_datetime: new Date()
            },
            {
                id: 6,
                fk_room: 2,
                fk_user: 2,
                content: 'Em que posso ajudar',
                sent_datetime: new Date()
            }
        ]
    }
]