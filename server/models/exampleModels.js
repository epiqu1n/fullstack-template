import mongoose, { Schema } from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const _config = JSON.parse(await fs.readFile(path.join(__dirname, './config.json')));

mongoose.connect(_config.databaseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: _config.databaseName
})
.then(() => console.log(`Connected to Mongo database '${_config.databaseName}'`))
.catch((err) => console.error(err));

const exampleSchema = new Schema({
  name: String
});

const ExampleModel = mongoose.model('Example', exampleSchema);

export { ExampleModel };