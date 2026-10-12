import path from 'node:path';
import { writeRouteFiles } from './writeRouteFiles';

await writeRouteFiles(path.resolve('dist'));
