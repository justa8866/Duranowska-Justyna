import {https} from "firebase-functions";
import {app} from "./main";

export const graphql = https.onRequest(app);
