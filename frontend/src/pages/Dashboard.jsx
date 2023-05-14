import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostingForm from '../components/PostingForm'
import PostingItem from '../components/PostingItem'
import Spinner from '../components/Spinner'
import { getPostings, reset } from '../features/postings/postingSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { postings, isLoading, isError, message } = useSelector(
    (state) => state.postings
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPostings())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Postings Dashboard</p>
      </section>

      <PostingForm />

      <section className='content'>
        {postings.length > 0 ? (
          <div className='postings'>
            {postings.map((posting) => (
              <PostingItem key={posting._id} posting={posting} />
            ))}
          </div>
        ) : (
          <h3>You have not set any postings</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
