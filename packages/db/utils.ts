import { exec } from 'child_process'
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  UpdateSecretCommand,
} from '@aws-sdk/client-secrets-manager'

const client = new SecretsManagerClient({
  region: 'ap-southeast-1',
})

export const getSecretValue = async (secretName: string) => {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      })
    )
    if (response && response.SecretString) {
      return JSON.parse(response.SecretString)
    } else {
      return null
    }
  } catch (error) {
    console.log('error in fetchSecret', error)
    return null
  }
}

export const createSecret = async (payload: any) => {
  try {
    const command = new CreateSecretCommand({
      Name: payload.secretName.toString(),
      SecretString: JSON.stringify(payload.secretValue),
    })
    const response = await client.send(command)
    return response
  } catch (error) {
    console.log('error in createSecret', error)
    return null
  }
}

export const updateSecret = async (secretName: any, payload: any) => {
  try {
    const secretValue = await getSecretValue(secretName)
    const command = new UpdateSecretCommand({
      SecretId: secretName.toString(),
      SecretString: JSON.stringify({ ...secretValue, ...payload }),
    })
    const response = await client.send(command)
    return response
  } catch (error) {
    console.log('error in createSecret', error)
    return null
  }
}

// function fetchSchemas() {
//   return new Promise(function (resolve, reject) {
//     exec(
//       `MYSQL_PWD=${DATABASE_PASSWORD} mysql -h ${DATABASE_HOST} -u ${DATABASE_USER_NAME} -e "show databases";`,
//       function (error, stdout, stderr) {
//         if (error) {
//           reject(error)
//         } else {
//           resolve(stdout)
//         }
//       }
//     )
//   })
// }

export async function getAllSchema() {
  // const schemaRes: any = await fetchSchemas()
  // console.log('schemaRes---->', schemaRes)
  // const schemas = schemaRes
  //   .split('\n')
  //   .filter(
  //     (ele: any) =>
  //       ![
  //         'Database',
  //         'information_schema',
  //         'mysql',
  //         'performance_schema',
  //         '',
  //         'sys',
  //         'tmp',
  //       ].includes(ele)
  //   )
  // return schemas
  return []
}

export const getDataBaseUrl = async (DATABASE_NAME: string) => {
  const secretName =
    process.env.MODE === 'development' ? 'local_database_cred' : 'database_cred'

  const secrets = await getSecretValue(secretName)
  const {
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
  } = secrets

  return `mysql://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
}

export const getDataBaseUrlSync = (
  DATABASE_USER_NAME: string,
  DATABASE_PASSWORD: string,
  DATABASE_HOST: string,
  DATABASE_PORT: string,
  DATABASE_NAME: string
) => {
  return `mysql://${DATABASE_USER_NAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
}

export const createMigration = (migrationName: string) => {
  return new Promise(function (resolve, reject) {
    exec(
      `yarn workspace intelliKam run create --name ${migrationName}`,
      function (error, stdout, stderr) {
        if (error) {
          reject(false)
        } else {
          resolve(true)
        }
      }
    )
  })
}

export const applyCreatedMigration = () => {
  return new Promise(function (resolve, reject) {
    exec(`yarn run prisma migrate deploy`, function (error, stdout, stderr) {
      if (error) {
        reject(false)
      } else {
        resolve(true)
      }
    })
  })
}

export const generateNewPrismaClient = () => {
  return new Promise(function (resolve, reject) {
    exec(`yarn run prisma generate`, function (error, stdout, stderr) {
      if (error) {
        console.log(error)
        reject(false)
      } else {
        console.log('stdout=====', stdout)
        resolve(true)
      }
    })
  })
}
