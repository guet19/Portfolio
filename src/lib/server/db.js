import {MongoClient, ObjectId} from "mongodb";
import {DB_URI} from "$env/static/private"

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("Portfolio")

async function getProjects() {
    let projects = [];

    try {
        const collection = db.collection("projects");
        const query = {};
        projects = await collection.find(query).toArray();
        projects.forEach(project => {
            project._id = project._id.toString();
            
        });
    } catch (error) {console.log("Datenbank nicht erreichbar");

    }
    return projects
}

async function getProject(project_id) {
    let project = null;

    try {
        const collection = db.collection("projects");
        const query = {_id: new ObjectId(project_id)};
        project = await collection.findOne(query);
        if (project) {
        project._id = project._id.toString();
        }
        
            
    } catch (error) {console.log("Datenbank nicht erreichbar");

    }
    return project
}

async function getProjectBySlug(sluginput) {
    let project = null;

    try {
        const collection = db.collection("projects");
        const query = {slug:sluginput};
        project = await collection.findOne(query);
        if (project) {
        project._id = project._id.toString();
        }
        
            
    } catch (error) {console.log("Datenbank nicht erreichbar");

    }
    return project
}


export default {getProjects, getProject, getProjectBySlug}