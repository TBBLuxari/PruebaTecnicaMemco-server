//S5ZPDdtIb4GCsriD
import mongoose from "mongoose";

const uri: string = "";

mongoose.connect(uri)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));