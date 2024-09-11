const bcrypt = require('bcryptjs')
const { sequelize } = require('./models')
const { User, Role, Task } = require('./models')

async function seedDatabase () {
  try {
    // Crear roles
    const adminRole = await Role.create({
      name: 'admin',
      description: 'Administrador con todos los permisos',
      permissions: ['create_task', 'read_task', 'update_task', 'delete_task', 'manage_users']
    })

    const userRole = await Role.create({
      name: 'user',
      description: 'Usuario estándar',
      permissions: ['create_task', 'read_task', 'update_task', 'delete_task']
    })

    // Crear usuario administrador
    const adminPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      roleId: adminRole.id
    })

    // Crear usuario estándar de prueba
    const userPassword = await bcrypt.hash('user123', 10)
    const regularUser = await User.create({
      username: 'usuario',
      email: 'usuario@example.com',
      password: userPassword,
      roleId: userRole.id
    })

    // Crear algunas tareas de ejemplo
    await Task.bulkCreate([
      {
        title: 'Tarea de prueba 1',
        description: 'Esta es una tarea de prueba para el administrador',
        status: false,
        userId: adminUser.id
      },
      {
        title: 'Tarea de prueba 2',
        description: 'Esta es una tarea de prueba para el usuario estándar',
        status: false,
        userId: regularUser.id
      }
    ])

    console.log('Base de datos poblada con éxito')
  } catch (error) {
    console.error('Error al poblar la base de datos:', error)
  } finally {
    await sequelize.close()
  }
}

seedDatabase()
