var UserDB = require("../model/model");
const bcrypt=require('bcrypt')


//homepage
exports.home = (req, res) => {
  if (req.session.user) {
    console.log(req.session.user)
    res.render("home");
  } else {
    res.redirect("/api/login");
  }
};

// create and save user
exports.create = (req, res) => {
  // validate req
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  // new user
  const { name, email, gender, status, password } = req.body;

  const user = new UserDB({
    name,
    email,
    gender,
    status,
    password,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

//retrive and return all users / trive and return a singlr user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    UserDB.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retriving user" });
      });
  } else {
    UserDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: err.message || "Error occured while retirving the user",
          });
      });
  }
};

//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }
  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body, { useFindAndMOdify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `cannot update the user with ${id}. Maybe user not found`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete  a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id${id}.May be id is wrong` });
      } else {
        res.send({
          message: "user was deleted succesfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete",
      });
    });
};

// login
exports.login =  (req, res) => {
console.log(req.session.user)
    if (req.session.user) {
     res.redirect("/api/home");
    } else {
     res.render("login");  
    }
  };
  
  exports.loginSubmit = async (req, res) => {
    const { email } = req.body;
    const user = await UserDB.findOne({ email });

    req.session.user = user; // Set the session here

    if (user.role === "admin") {
        res.render('index', { users: user });
    } else {
        res.redirect('/api/home');
    }
};
  
  // session destroy
  exports.logout = (req, res) => {

    req.session.destroy(function(err){
      if(err){
        console.error(err);
       res.status(500).send("Internal Server Error");
      }else{
        res.redirect("/api/login");
      }
    })

  };

  //register
  exports.register = async (req, res) => {
    await res.render('register', { pageTitle: 'Register' })
  }
  
  exports.registerSubmit = async (req, res, next) => {
    try {
      const { name, email, password } = req.body
  
      // Password hashing
      const salt = await bcrypt.genSalt(12)
      const hashedPassword = await bcrypt.hash(password, salt)
  
      const user = new UserDB({
        name,
        email,
        password: hashedPassword,
      })
  
      await user.save()
      res.redirect('/')
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
  

  //search user
  exports.searchUser = async (req, res) => {
    const query = req.query.name;
    const users = await UserDB.find({ name: { $regex: new RegExp(query, 'i') } });
    
    res.render('search', { users: users });
};
  