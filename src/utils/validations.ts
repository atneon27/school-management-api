class CoordinateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CoordinateError";
    }
}

class BodyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BodyError";
    }
}

function validateCoordinates(latitude: number, longitude: number) {
    if(latitude < -90 || latitude > 90) {
        throw new CoordinateError("Latitude must be between -90 and 90"); 
    }

    if(longitude < -180 || longitude > 180) {
        throw new CoordinateError("Longitude must be between -180 and 180");
    }
}

function validateData(name: string, address: string) {
    if(name.length > 255 && address.length > 255) {
        throw new BodyError("Both name and length should be less then 255 characters long!");
    } else if(name.length > 255) {
        throw new BodyError("Name sould be less then 255 characters long!");
    } else if(address.length > 255) {
        throw new BodyError("Address must be less then 255 charactes long!");
    }

    if(name.length < 3 && address.length < 3) {
        throw new BodyError("Both name and length should be more then 3 characters long!"); 
    } else if(name.length < 3) {
        throw new BodyError("Name sould be more then 3 characters long!");
    } else if(address.length < 3) {
        throw new BodyError("Address must be more then 3 charactes long!");
    }
}

function getEuclideanDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const subLat = lat2 - lat1;
    const subLon = lon2 - lon1;
    const distance = Math.sqrt(subLat * subLat + subLon * subLon);
    return distance;
}

export {
    validateCoordinates,
    validateData,
    CoordinateError,
    BodyError,
    getEuclideanDistance
}