import { app } from 'electron'
import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '../../.env') })

app.commandLine.appendSwitch('ignore-certificate-errors')