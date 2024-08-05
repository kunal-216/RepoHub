import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import Spinner from '../components/Spinner'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'
import { toast } from 'react-toastify'

const HomePage = () => {

  const [userProfile,setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [sortType,setSortType] = useState("");

  const getUserProfileandRepos = async(username="kunal-216") => {
    setLoading(true)
    try {
      const res = await fetch(`https://repohub-t35f.onrender.com/api/users/profile/${username}`)
      const {repos,userProfile} = await res.json();
      
      setRepos(repos);
      setUserProfile(userProfile);
      return {userProfile,repos};
    } catch (error) {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getUserProfileandRepos();
  },[])

  const onSearch = async (e,username) => {
    e.preventDefault();

    setLoading(true)
    setRepos([])
    setUserProfile(null)

    const {userProfile,repos} = await getUserProfileandRepos(username)
    setUserProfile(userProfile)
    setRepos(repos)
    setLoading(false)
  }

  const onSort = (sortType) => {
    if(sortType === "recent"){
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); // descending
    }
    else if(sortType === "forks"){
      repos.sort((a,b) => b.forks_count - a.forks_count);
    }
    else if(sortType === "stars"){
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    }
    setSortType(sortType)
    setRepos([...repos])
  }

  return (
    <div className='m-4'>
      <Search onSearch={onSearch} />
      {repos.length>0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos}/>}
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage
