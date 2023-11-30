

const register=async function(req,res){
    try {
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const login=async function(req,res){
    try {
        
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports={register,login}