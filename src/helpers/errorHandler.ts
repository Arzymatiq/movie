type ErrorHandlers = {
    [status: number]: () => string;
};

const errorHandlers: ErrorHandlers = {
    400: () => "Bad Request. Please check your input.",
    401: () => "Unauthorized. Please log in.",
    403: () => "Forbidden. You do not have access to this resource.",
    404: () => "Not Found. The requested resource could not be found.",
    500: () => "Server Error. Please try again later.",
};

export const handleError = (status?: number): string => {
    return (
        (status && errorHandlers[status]?.()) || "An unexpected error occurred."
    );
};
