const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const {check, validationResult} = require('express-validator');

// GET api/profile/me
// get current user profile, private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await  Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({msg: "There is no profile"})
        }

        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});



// POST api/profile
// create or update user profile, private

router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
  ]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {
        company, website, location, status, bio, githubuser, skills, youtube, twitter, facebook, linkedin, instagram
    } = req.body;

    // Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(status) profileFields.status = status;
    if(bio) profileFields.bio = bio;
    if(githubuser) profileFields.githubuser = githubuser;
    if(location) profileFields.location = location;
    if(skills) {
        profileFields.skills = skills.split(',').map( skill => skill.trim());

    }

      // Build Social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
            return res.json(profile);
        }
        

        //Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: 'Server error' });
      }
}
);



// GET api/profile/
// get current user profile, private
router.get('/', async (req, res) => {
    try{
        const profiles = await  Profile.find().populate('user', ['name', 'avatar']);
        

        res.json(profiles);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});
// GET api/profile/user/:user_id
// get current user profile, public
router.get('/user/:user_id', async (req, res) => {
    try{
        const profile = await  Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile) return res.status(400).json({msg: 'There is no profile for this user'})

        res.json(profile);
    }catch(err){
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return  res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send('Server Error')
    }
});

// DELETE api/profile/
// delete profile, user and post, private

router.delete('/', auth, async (req, res) => {
    try{
        //Remove profile
        await  Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await  User.findOneAndRemove({_id: req.user.id});
        

        res.json({msg: 'User deleted'});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error!')
    }
});


// put api/profile/experience
router.put('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from date is required').not().isEmpty(),
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {
        title, 
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title, 
        company,
        location,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await  Profile.findOne({user: req.user.id});
        
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
        
       
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error!')
    }
});

// delete api/profile/experience/:exp_id
router.delete('/experience/:exp_id', auth, async (req, res) => {
   const profile = await  Profile.findOne({user: req.user.id});

   //Get remove Index
   const removeIndex = profile.experience.map(item => item.id).indexOf
   (req.params.exp_id);

   profile.experience.splice(removeIndex, 1);
   await profile.save();

   res.json(profile)

});
// put api/profile/education


router.put('/education', [auth,
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {
        school, 
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school, 
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try{
        const profile = await  Profile.findOne({user: req.user.id});
        
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile)
        
       
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error!')
    }
});


// delete api/profile/education/:edu_id
router.delete('/education/:edu_id', auth, async (req, res) => {
    const profile = await  Profile.findOne({user: req.user.id});
    // delete posts 
    await Post.deleteMany({user: req.user.id})
    //Get remove Index
    const removeIndex = profile.education.map(item => item.id).indexOf
    (req.params.edu_id);
 
    profile.education.splice(removeIndex, 1);
    await profile.save();
 
    res.json(profile)
 
 });

// @route GET api/profile/github/:username
// @desc  Get user repositories from Github
// @acces Public
router.get('/github/:username', (req, res) => {
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': "node.js"}
        }
        

        request(options, (errors, response, body) => {
            if(errors) console.log(errors);

            if(response.statusCode !== 200) {
               return res.status(404).json({msg: 'No GH profile found'});
            }

            res.json(JSON.parse(body))
        })
   
        
       
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error!')
    }
})


module.exports = router;
