const mongoose = require('mongoose')

const connect = ()=> {
    return mongoose.connect('mongodb://localhost:27017/mydb')
}

const student = new mongoose.Schema(
    {
        firstName: {
            type: String, // can use built-in JS primitives
            required: true,
            unique: false
        },
        info: {
            school: {
                type: String
            },
            shoeSize: {
                type: Number
            }
        },
        faveFoods: [{type: String}]
    }, 
    {timestamps: true} // via mongoose, maybe mongo.
)  

const Student = mongoose.model('student', student)


connect()
    .then(async connection => {
        const student = await Student.create({firstName:"Tim"}) 
        console.log(student) // this is a mongoose document object, not just a json-y object. 

        const found = await Student.find({firstName:"Tim"})
        const student1 = await Student.findById('asdfasdfasdf')
        const student2 = await Student.findById('asdfasdfasdf')
    })
    .catch( e => console.error(e))

