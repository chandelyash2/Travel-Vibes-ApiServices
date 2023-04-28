import { Sequelize } from 'sequelize'
export const sequelize = new Sequelize('travel_vibes', 'root', 'root@0208', {
  host: 'localhost',
  dialect: 'mysql',
})
const sqlConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((error) => {
      console.error('Unable to connect to the database: ', error)
    })
}

export default sqlConnection
