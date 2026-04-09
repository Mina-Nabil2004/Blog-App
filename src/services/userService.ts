import ApiError from "../errors/ApiError.js";
import type { User, UserCreate, UserPublic, UserUpdate } from "../schemas/userSchema";
const users: User[] = [];

export function createUser(userData: UserCreate): User {
    const emailTaken = users.some((u) => u.email === userData.email);
    if (emailTaken) 
        throw ApiError.badRequest({ email: `Email ${userData.email} is already taken` });
    const newUser: User = {...userData, id: crypto.randomUUID()};
    users.push(newUser);
    return newUser;
}

function omitPassword(user: User): UserPublic {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export function getUsers(): UserPublic[] {
    return users.map(user => {
        return omitPassword(user);
    });
}

export function getUser(id: string): UserPublic {
    const user = users.find(user => user.id === id);
    if (!user) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    return omitPassword(user);
}

export function updateUser(id: string, updatedUser: UserUpdate): UserPublic {
    const user = users.find(user => user.id === id);
    if (!user) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    Object.assign(user, updatedUser);
    return omitPassword(user);
}

export function deleteUser(id: string): void {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    users.splice(index, 1);
}