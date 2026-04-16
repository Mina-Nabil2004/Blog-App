class ApiError extends Error {
    statusCode: number;
    errors: Record<string, string>;
    constructor(statusCode: number, errors: Record<string, string>) {
        super();
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    static badRequest(errors: Record<string, string>) {
        return new ApiError(400, errors);
    }

    static unauthorized(errors: Record<string, string>) {
        return new ApiError(401, errors);
    }

    static forbidden(errors: Record<string, string>) {
        return new ApiError(403, errors);
    }

    static notFound(errors: Record<string, string>) {
        return new ApiError(404, errors);
    }

    static internal(errors: Record<string, string>) {
        return new ApiError(500, errors);
    }
}

export default ApiError;