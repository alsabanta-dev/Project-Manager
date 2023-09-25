const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLEnumType, GraphQLNonNull } = require('graphql')
const Client = require('../models/clientModel')
const Project = require('../models/projectModel')

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString}
  })
})

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    }
  }
})


// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        return Client.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then(projects => {
          projects.forEach(project => {
            // project.remove()
            Project.findByIdAndRemove(project.id).then((err) => {console.log(err)})
          });
        });
        return Client.findByIdAndRemove(args.id)
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: new GraphQLEnumType({
              name: 'ProjectStatus',
              values: {
                new: {value: 'Not Started'},
                progress: {value: 'In Progress'},
                completed: {value: 'Completed'},
              }
            }),
          defaultValue: 'Not Started'
        },
        clientId: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        return Project.create({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        })
      }
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: {value: 'Not Started'},
              progress: {value: 'In Progress'},
              completed: {value: 'Completed'},
            }
          })
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status
          }
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})

// const clients = [
//   {
//     id: '1',
//     name: 'Simba Adeeb',
//     email: 'simba@email.com',
//     phone: '0990156087'
//   },
//   {
//     id: '2',
//     name: 'Ghaidag Adeeb',
//     email: 'ghaidag@email.com',
//     phone: '0990156087'
//   },
//   {
//     id: '3',
//     name: 'Shams Adeeb',
//     email: 'shams@email.com',
//     phone: '0990156087'
//   },
//   {
//     id: '4',
//     name: 'Adeeb Osman',
//     email: 'adeeb@email.com',
//     phone: '0990156087'
//   },
// ]

// const projects = [
//   {
//     id: '1',
//     name: 'Mobile app',
//     description: 'This is the description of Mobile App ',
//     status: 'In progress',
//     clientId: '1'
//   },
//   {
//     id: '2',
//     name: 'Web app',
//     description: 'This is the description of Web App ',
//     status: 'No Started',
//     clientId: '2'
//   },
//   {
//     id: '3',
//     name: 'Photo Design',
//     description: 'This is the description of Photo Design ',
//     status: 'Done',
//     clientId: '2'
//   },
// ]