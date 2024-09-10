const Sequelize = require('sequelize')
const config = require('../config')

const { DataTypes } = require('sequelize')

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

// modelo de Rol
const Role = sequelize.define('roles', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  permissions: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

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
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
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
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
})

// Definir relaciones
User.hasMany(Task, { foreignKey: 'user_id' })
Task.belongsTo(User, { foreignKey: 'user_id' })

User.belongsTo(Role, { foreignKey: 'role_id' })
Role.hasMany(User, { foreignKey: 'role_id' })

sequelize.authenticate()
  .then(() => {
    console.log('DB Conectada')
  })
  .catch(error => {
    console.log(`ERROR DE CONEXION: ${error}`)
  })

User.prototype.hasPermission = async function (permissionName) {
  const role = await this.getRole()
  return role.permissions.includes(permissionName)
}
async function findAll (table) {
  const tableFields = await table.describe()

  if ('is_deleted' in tableFields) {
    return await table.findAll({ where: { is_deleted: false } })
  } else {
    return await table.findAll()
  }
}

async function findAllForId (table, userId) {
  const tableFields = await table.describe()

  const whereCondition = userId ? { user_id: userId } : {}

  if ('is_deleted' in tableFields) {
    return await table.findAll({ where: { ...whereCondition, is_deleted: false } })
  } else {
    return await table.findAll({ where: whereCondition })
  }
}

async function findOne (table, id) {
  const tableFields = await table.describe()

  if ('is_deleted' in tableFields) {
    return await table.findOne({ where: { id, is_deleted: false } })
  } else {
    return await table.findOne({ where: { id } })
  }
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
  Role,
  findAll,
  findAllForId,
  findOne,
  query,
  delete_,
  recover,
  add
}
