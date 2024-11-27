interface UserProfileResponse {
    status: number,
    message: string,
    body: {
        email: string,
        firstName: string,
        lastName: string,
        userName: string,
        createdAt: string,
        updatedAt: string,
        id: string
    }
}
interface UpdateProfileBody {
    userName: string,
}
interface LoginBody {
    email: string,
    password: string
}
interface LoginResponse {
    status: number;
    message: string;
    body: {
        token: string;
    }
}
interface Token {
    token: string | null,
}

interface User {
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    userName: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    id: string | null
    token: string | null,
}

interface SignupBody {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userName: string
}
