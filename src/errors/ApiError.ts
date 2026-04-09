class ApiError {
    statusCode: number;
    message: Record<string, string>;
    constructor(statusCode: number, message: Record<string, string>) {
        this.statusCode = statusCode;
        this.message = message; 
    }

    static badRequest(message: Record<string, string>) {
        return new ApiError(400, message);
    }

    static notFound(message: Record<string, string>) {
        return new ApiError(404, message);
    }

    static internal(message: Record<string, string>) {
        return new ApiError(500, message);
    }
}

export default ApiError;