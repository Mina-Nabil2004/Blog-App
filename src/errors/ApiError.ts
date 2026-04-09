class ApiError extends Error{
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message; 
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }

    static notFound(message: string) {
        return new ApiError(404, message);
    }

    static internal(message: string) {
        return new ApiError(500, message);
    }
}

export default ApiError;