import mysql2 from 'mysql2/promise';
import { SchoolType } from '../types/types';

class Database {
    private static connection: mysql2.Connection;

    async connect() {
        if(Database.connection) {
            console.log("Already connected to database");
            return Database.connection;
        }

        // create an intial connection with the database
        const initialConn = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',   
            password: 'root',
        })

        // create a school management database
        await initialConn.query('CREATE DATABASE IF NOT EXISTS school_management');

        // create a connection to the school management database
        Database.connection = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',   
            password: 'root',
            database: 'school_management',
        });

        // create the schools table
        await this.createTable();

        console.log("Connected to database");
        return Database.connection;
    }    

    async createTable() {
        await Database.connection.execute(`
            CREATE TABLE IF NOT EXISTS schools (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                latitude DECIMAL(10,7) NOT NULL,
                longitude DECIMAL(10,7) NOT NULL,
                UNIQUE (latitude, longitude)
            );
        `)
    }

    async insertSchool(shcool: SchoolType) {
        await Database.connection.query(`
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)
        `, [shcool.name, shcool.address, shcool.latitude, shcool.longitude]);
    }

    async getSchools() {
        const [rows] = await Database.connection.execute(`
            SELECT name, address, latitude, longitude FROM schools
        `);
        return rows as Array<SchoolType>;
    }

    async closeConnection() {
        await Database.connection.end();
        console.log("closed database connection")
    }
}

const db = new Database();

export default db;