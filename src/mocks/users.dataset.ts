export interface IUser {
    id: string;
    phone: string;
    access_token: string;
    description?: string;
    profile: {
        image: string;
        thumbnail?: {
            url: string;
            resolution?: string;
            pixels: {
                width: number;
                height: number;
            }
        };
    }
    email?: string;
}

export const users: IUser[] = [
    {
        id: "0",
        phone: "+12345678901",
        access_token: "token123abc",
        description: "user description",
        profile: {
            image: "https://example.com/images/user1.jpg",
            thumbnail: {
                url: "https://example.com/images/user1_thumb.jpg",
                resolution: "HD",
                pixels: {
                    width: 128,
                    height: 128
                }
            }
        },
        email: "user1@example.com"
    },
    {
        id: "1",
        phone: "+12345678902",
        access_token: "token456def",
        profile: {
            image: "https://example.com/images/user2.jpg",
            thumbnail: {
                url: "https://example.com/images/user2_thumb.jpg",
                pixels: {
                    width: 64,
                    height: 64
                }
            }
        }
    },
    {
        id: "2",
        phone: "+12345678903",
        access_token: "token789ghi",
        profile: {
            image: "https://example.com/images/user3.jpg"
        },
        email: "user3@example.com"
    },
    {
        id: "3",
        phone: "+12345678904",
        access_token: "tokenabc123",
        profile: {
            image: "https://example.com/images/user4.jpg",
            thumbnail: {
                url: "https://example.com/images/user4_thumb.jpg",
                resolution: "FullHD",
                pixels: {
                    width: 192,
                    height: 192
                }
            }
        },
        email: "user4@example.com"
    },
    {
        id: "4",
        phone: "+12345678905",
        access_token: "tokendef456",
        profile: {
            image: "https://example.com/images/user5.jpg",
            thumbnail: {
                url: "https://example.com/images/user5_thumb.jpg",
                pixels: {
                    width: 100,
                    height: 100
                }
            }
        }
    },
    {
        id: "5",
        phone: "+12345678906",
        access_token: "tokenghi789",
        profile: {
            image: "https://example.com/images/user6.jpg"
        },
        email: "user6@example.com"
    },
    {
        id: "6",
        phone: "+12345678907",
        access_token: "tokenjkl012",
        profile: {
            image: "https://example.com/images/user7.jpg",
            thumbnail: {
                url: "https://example.com/images/user7_thumb.jpg",
                resolution: "HD",
                pixels: {
                    width: 120,
                    height: 120
                }
            }
        }
    },
    {
        id: "7",
        phone: "+12345678908",
        access_token: "tokenmno345",
        profile: {
            image: "https://example.com/images/user8.jpg"
        }
    },
    {
        id: "8",
        phone: "+12345678909",
        description: "user description",
        access_token: "tokenpqr678",
        profile: {
            image: "https://example.com/images/user9.jpg",
            thumbnail: {
                url: "https://example.com/images/user9_thumb.jpg",
                pixels: {
                    width: 150,
                    height: 150
                }
            }
        },
        email: "user9@example.com"
    },
    {
        id: "9",
        phone: "+12345678910",
        access_token: "tokenstu901",
        profile: {
            image: "https://example.com/images/user10.jpg"
        },
        email: "user10@example.com"
    }
];