const Sequelize = require('sequelize')
const config = require('../config')

// sequelize, parametros de conexion
const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.user,
  config.mysql.password,
  {
    host: config.mysql.host,
    dialect: 'mysql',
    logging: false
  }
)

// modelo de Usuario
const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
})
// Definir el modelo de Tarea
const Task = sequelize.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('pendiente', 'en_progreso', 'completada'),
    defaultValue: 'pendiente'
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
})

// Definir relaciones
User.hasMany(Task, { foreignKey: 'user_id' })
Task.belongsTo(User, { foreignKey: 'user_id' })

sequelize.authenticate()
  .then(() => {
    console.log('DB Conectada')
  })
  .catch(error => {
    console.log(`ERROR DE CONEXION: ${error}`)
  })

async function findAll (table) {
  return await table.findAll({ where: { is_deleted: false } })
}

async function findOne (table, id) {
  return await table.findOne({ where: { id, is_deleted: false } })
}

async function query (table, conditions) {
  return await table.findOne({ where: { ...conditions, is_deleted: false } })
}

async function delete_ (table, id) {
  return await table.update({ is_deleted: true }, { where: { id } })
}

async function recover (table, id) {
  return await table.update({ is_deleted: false }, { where: { id } })
}

async function add (table, data) {
  return await table.upsert(data)
}

module.exports = {
  sequelize,
  User,
  Task,
  findAll,
  findOne,
  query,
  delete_,
  recover,
  add
}
