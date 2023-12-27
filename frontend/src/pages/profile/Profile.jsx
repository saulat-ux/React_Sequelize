
import { useDispatch, useSelector } from 'react-redux'
import './profile.scss'
import { useEffect, useState } from 'react'
import Card from '../../components/card/Card'
import { getUser, updatePhoto, updateUser } from '../../Redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const cloud_name = 'dnpa27ruj'
const upload_preset = 'ml_default'
const url = 'https://api.cloudinary.com/v1_1/dnpa27ruj/image/upload'

const Profile = () => {
  const {isLoading, user} = useSelector((state) => state.auth)
  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    ImageURL: user?.ImageURL || ''

  }
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
   
      dispatch(getUser())

    
  }, [dispatch])

  useEffect(() => {
    if(user) {
     setProfile({
      name: user?.name || '',
      email: user?.email || '',
      password: user?.password || '',
      ImageURL: user?.ImageURL || ''
     })

    }
  }, [dispatch, user])

  const  handleInputChange= (e) => { 
    const {name, value} = e.target;
    setProfile({...profile, [name]: value});
  }
 
  const saveProfile = async(e) => {
    e.preventDefault()
     const userData = {
      name:profile.name,
      email: profile.email,
      password: profile.password
     }
     console.log(userData)
     await dispatch(updateUser(userData))
   }

  const handleImageChange = (e) => { 
    setProfileImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const savePhoto = async (e) => {
      e.preventDefault()
      let imageURL;

      try {
        if(profileImage !== null &&
          (profileImage.type === 'image/jpeg' 
          || profileImage.type === 'image/png' 
          || profileImage.type === 'image/jpg')
          
          ){
              const image = new FormData()
              image.append('file', profileImage)
              image.append('cloud_name', cloud_name)
              image.append('upload_preset', upload_preset)

              // save image to cloudinary
              const response = await fetch(url, {method: 'post' , body: image})
              const imageData = await response.json()
              // console.log(imageData)
              imageURL = imageData.url.toString()
        }

        // save image to sequelize
        const userData = {
          ImageURL: profileImage ? imageURL : profile.ImageURL
        }
        await dispatch(updatePhoto(userData))
        setImagePreview(null)
      } catch (error) {
        toast.error(error.message)
      }
  }


  return (
    <section>

    <div className='container'>

      <h2>Profile</h2>
      <div className='--flex-start profile'>
        <Card cardClass={'card'}>
            {!isLoading  && user && (
              <>
              <div className='profile-photo'>
               <div>
                <img src={imagePreview === null ? user?.ImageURL: imagePreview} alt="profile" />

                {imagePreview !== null && (
                  <button className='--btn --btn-secondary' onClick={savePhoto}>Upload photo</button>
                )}
               </div>
              </div>
              <form onSubmit={saveProfile}>
                <p>
                  <label>Change photo:</label>
                  <input type="file" accept='image/*' name='image' onChange={handleImageChange} />
                </p>
                <p>
                  <label> Name:</label>
                  <input type="text" 
                   name='name'
                   value={profile?.name}
                    onChange={handleInputChange}
                    required />
                </p>
                <p>
                  <label> Email:</label>
                  <input type="email"
                        name='email'
                        value={profile?.email}
                     onChange={handleInputChange} 
                     
                     required
                     />
                </p>
                <p>
                  <label> password:</label>
                  <input type="password"
                        name='password'
                        value={profile?.password}
                     onChange={handleInputChange} 
                     required
                     />
                </p>
                <button className='--btn --btn-primary --btn-block' >Update profile</button>
              </form>
              
              </>
            )}

        </Card>
      </div>
    </div>
    </section>
  )
}

export default Profile