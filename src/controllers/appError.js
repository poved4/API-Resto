// 200 OK
// 201 Created
// 204 No Content
// 304 Modified

// 400 Bad Request      :: jwt malformed - emailRegister - emptyData
// 401 Unauthorized

// 403 Forbidden
// 404 Not found
// 500 Internal Server Error
// 501 Not Implemented

class ok extends Error {
    constructor(message) {
        super(message);
        this.code = 200;
        this.name = "OK";
    }
}

class created extends Error {
    constructor(message) {
        super(message);
        this.code = 201;
        this.name = "Created";
    }
}

class noContent extends Error {
    constructor(message = "No Content") {
        super(message);
        this.code = 204;
        this.name = "No Content";
    }
}

class modified extends Error {
    constructor(message) {
        super(message);
        this.code = 304;
        this.name = "Modified";
    }
}

class badRequest extends Error {
    constructor(message) {
        super(message);
        this.code = 400;
        this.name = "Bad Request";
    }
}

class unauthorized extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.code = 401;
        this.name = "Unauthorized";
    }
}

class forbidden extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.code = 403;
        this.name = "Forbidden";
    }
}

class notFound extends Error {
    constructor(message) {
        super(message);
        this.code = 404;
        this.name = "Not found";
    }
}

class serverError extends Error {
    constructor(message) {
        super(message);
        this.code = 500;
        this.name = "Internal Server Error";
    }
}

class notImplemented extends Error {
    constructor(message) {
        super(message);
        this.code = 501;
        this.name = "Not Implemented";
    }
}

module.exports = {
    ok, 
    created, 
    noContent, 
    modified,
    badRequest, 
    unauthorized, 
    forbidden, 
    notFound, 
    serverError, 
    notImplemented
}