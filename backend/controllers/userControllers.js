import User from "../models/userModel.js"
const getUserProfileAndRepos = async (req,res) => {
    const {username} = req.params;
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`,{
            headers:{
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const userProfile = await userRes.json();

        const repoRes = await fetch(userProfile.repos_url,{
            headers:{
                authorization: `token ${process.env.GITHUB_API_KEY}`,
            },
        });
        const repos = await repoRes.json();

        res.status(200).json({userProfile,repos})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const likeProfileFunc = async (req,res) => {
    try {
        const {username} = req.params;
        const user = await User.findById(req.user._id.toString());
        console.log("Auth user:",user);

        const userToLike = await User.findOne({username})
        if(!userToLike){
            return res.status(404).json({success:false, message: "User not found"})
        }
        if(user.likedProfiles.includes(userToLike.username)){
            return res.status(400).json({success:false, message: "You already liked this profile"})
        }
        
        userToLike.likedBy.push({username:user.username, avatartUrl:user.avatarUrl, likedDate:Date.now()})
        user.likedProfiles.push(userToLike.username);

        // The fast process to save at the same time
        await Promise.all([userToLike.save(),user.save()])

        res.status(200).json({message: "User liked successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getLikes = async (req,res) => {
    try {
        const user = await User.findById(req.user._id.toString())
        res.status(200).json({likedBy:user.likedBy})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export {getUserProfileAndRepos, likeProfileFunc, getLikes};