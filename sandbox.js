const mongoose = require('mongoose')

const connect = ()=> {
    return mongoose.connect('mongodb://localhost:27017/mydb')
}

const studentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, // can use built-in JS primitives
            required: true,
            unique: false // better not to put unique-true here, better to put it down low
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
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'district',
    },
    name: {
        type: String,
        unique: false
    }
})

const Student = mongoose.model('student', studentSchema)
const School = mongoose.model('school', schoolSchema)


school.virtual('staffcount')
  .get(function(){
    return this.staff.length;
  }) // can't use arrow because it keeps the outer 'this' // i wonder why school isn't passed as a param?
/// maybe don't put async code inside virtuals... might even break....

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


// can search string against an array, or $in {staff ['v', 'b', 'g']} ---- dollar sign operators ($lt:, $gt:)
// sort('-openSisnce)')  descending


school.pre('save', function() {
    console.log('before save (after validation)')
})


school.pre('validate', function() {
    console.log('before validation')
})


// ther'es a middleware hook before any operation.    (there's gotchas in what 'this' is.)

school.post('save', function() {
    console.log('after save')
})

// you can do async.
school.post('save', function(doc,next){
    // i deleted something, so now I need to delete the applicable references.
    // if you ask for 2 arguments, they know it's async.
    // this is a great time to "ping everybody in the chatroom with the new message"
})


// compound indexes:
// db's cannot live without indexes; can't search whole array for your key... indexes are saved in a file kept in memory. if you're querying from indexes you're just going to db.
// unique: true triggers index creation.
// compound index is index on more than one field.
// a school is part of a district. make 

schoolSchema.index({
    district: 1,
    name: 1 // unique within a district. always put 1 (they're working on this.) // index by highest potential for change // cardinality. // big ones first, little ones underneath.
}, {unique: true}) // PUT ALL THE INDEX

