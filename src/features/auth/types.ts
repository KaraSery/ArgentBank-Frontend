interface UserProfileResponse {
    status: 0,
    message: string,
    body: {
        id: string,
        email: string
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

interface SignupBody {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userName: string
}
