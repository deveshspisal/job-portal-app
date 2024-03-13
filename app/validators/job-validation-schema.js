const jobValidationSchema = {
    title : {
        notEmpty : {
            errorMessage : "Title is required"
        }
    },
    description : {
        notEmpty : {
            errorMessage : "Description is required"
        }
    }
}

module.exports = jobValidationSchema