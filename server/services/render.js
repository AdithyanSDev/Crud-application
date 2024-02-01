const axios=require('axios')



exports.homeRoutes = async (req, res) => {
    try {
        if (req.session.user) {
            const response = await axios.get('http://localhost:3000/api/users');
            const users = response.data;
            res.render('index', { users: users });
        } else {
            res.redirect('/api/login');
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
};


exports.add_user=(req,res)=>{
    res.render('add_user')
}

exports.update_user=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user:userdata.data})
    })
.catch(err=>{
    res.send(err)
})
}