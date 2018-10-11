const mongoose = require('mongoose')

const connect = ()=> {
    return mongoose.connect('mongodb://localhost:27017/mydb')
}

const studentSchema = new mongoose.Schema(
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
        faveFoods: [{type: String}],
        school: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'school'
        }
    }, 
    {timestamps: true} // via mongoose, maybe mongo.
)  

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Student = mongoose.model('student', studentSchema)
const School = mongoose.model('school', schoolSchema)


connect()
    .then(async connection => {
        const school = await School.findOneAndUpdate({name: 'mlk elementary'}, {name: 'mlk elementary'}, {upsert:true, new:true}).exec() // exec is nice with exec'ing Promises. ... if something's tight to spec of Promises.
        const student = await Student.create({firstName:"Tim", school:school._id})

        const match = await Student.findById(student.id) // mongoose adds .id (i'm guessing we could have used)
            .populate('school') // fills out refs
            .exec()
        console.log(match);
    })
    .catch( e => console.error(e))

// findOneAndCreate can have upsert=true.