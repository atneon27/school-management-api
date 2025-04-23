import express, { Request, Response} from 'express';
import cors from 'cors';
import db from './db/database.js';
import { SchoolType } from './types/types';
import { validateData, validateCoordinates, CoordinateError, BodyError, getEuclideanDistance } from './utils/validations.js';

const app = express();

app.use(cors())
app.use(express.json());

await db.connect();

app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;
    if(!latitude || !longitude) {
        res.status(400).json({
            message: "Latitude and longitude are required",
        });
        return;
    }

    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);

    // Get all schools from the database
    let schools = await db.getSchools();

    schools = schools.sort((school1, school2) => {
        const distance1 = getEuclideanDistance(school1.latitude, school1.longitude, lat, lon);
        const distance2 = getEuclideanDistance(school2.latitude, school2.longitude, lat, lon);
        return distance1 - distance2;
    })

    res.json({
        result: schools,
        user_coordinates: {
            "latitude": lat,
            "longitude": lon,
        },
    })
});

app.post('/addSchool', async (req: Request, res: Response) => {
    const body = req.body as SchoolType;
    try {
        // Validate data
        validateData(body.name, body.address);
        validateCoordinates(body.latitude, body.longitude);

        // Insert the school into the database
        await db.insertSchool(body);

        res.json({
            message: "School added successfully",
            body: {
                name: body.name,
                address: body.address,
                latitude: body.latitude,
                longitude: body.longitude,
            },
        });
    } catch (error: any) {
        // Handle validation errors
        if (error instanceof CoordinateError) {
            res.status(400).json({
                message: error.message,  
            });
            return;
        }

        if (error instanceof BodyError) {
            res.status(400).json({
                message: error.message,  
            });
            return
        }

        // Handle database errors like duplicate entry
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: "School already exists at given coordinates",
            });
            return
        }

        // General error handling for other cases
        console.error(error); 
        res.status(500).json({
            message: "An unexpected error occurred",
        });
    }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
