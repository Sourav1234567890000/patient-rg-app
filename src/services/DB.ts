import { PGliteWorker } from '@electric-sql/pglite/worker';
let db: PGliteWorker | null = null;

const initSchema = async (database: PGliteWorker) => {
    await database.query(`
        CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        patientName TEXT NOT NULL,
        address TEXT,
        email TEXT,
        phoneNumber TEXT,
        gender TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
    await database.query(`
        CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (patientName)
        `);
    console.log("Database schema initialized");
};

export const initDatabase = async (): Promise<PGliteWorker> => {
    if (!db) {
        try {
            const workerInstance = new Worker(new URL('/pglite-worker.js', import.meta.url), {
                type: 'module',
            });
            db = new PGliteWorker(workerInstance);
            await initSchema(db);
        } catch (error) {
            console.error("Failed to initialize database:", error);
            throw error;
        }
    }
    return db;
};

export const registerPatient = async (patientData: any): Promise<any> => {
    const database = await initDatabase();
    const {
        patientName,
        address,
        email,
        phoneNumber,
        gender
    } = patientData;
    const result = await database.query(
        `INSERT INTO patients
        (patientName, address, email, phone, gender)
        VALUES
        ($1,$2,$3,$4,$5)
        RETURNING ID`,
        [
            patientName,
            address || null,
            email || null,
            phoneNumber || null,
            gender  
        ]
    );
    return result.rows?.[0];
};

export const getAllPatients = async (): Promise<any[]> => {
    const database = await initDatabase();
    try {
      const result = await database.query(
        "SELECT * FROM patients ORDER BY patientName"
      );
      return result.rows || [];
    } catch (error) {
      console.error('Error executing getAllPatients query:', error);
      throw error;
    }
  };

  export const searchPatientsByName = async (
    searchTerm: string
  ): Promise<any[]> => {
    const database = await initDatabase();
     try {
      const result = await database.query(
        `SELECT * FROM patients
         WHERE patientName LIKE $1 
         ORDER BY patientName`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return result.rows || [];
     } catch (error) {
        console.error('Error executing searchPatientsByName query:', error);
        throw error;
     }
  };



