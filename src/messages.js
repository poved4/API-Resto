const msg = {
    "ok":           { code: 200, message: "successful application" },
    "created":      { code: 201, message: "Created" },
    "noContent":    { code: 204, message: "No Content" },
    "wrongData":    { code: 400, message: "Invalid data supplied"},
    "Unauthorized": { code: 401, message: "Unauthorized" },
    "NotFound":     { code: 404, message: "Not Found"},
    "server":       { code: 500, message: "Internal Server Error"},
    
    "emailRegister":{ code: 400, message: "Email registred"},
    "emptyData":    { code: 400, message: "empty spaces"},
  }

module.exports = { msg }