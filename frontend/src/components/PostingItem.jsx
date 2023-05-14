import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deletePosting, updatePosting } from '../features/postings/postingSlice'

function PostingItem({ posting }) {
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(text);
    dispatch(updatePosting({id:posting._id, newText:text}))
    setText('')
  }

  const [text, setText] = useState('')

  return (
    <div className='posting'>
      <div>{new Date(posting.createdAt).toLocaleString('en-US')}</div>
      <h2>{posting.text}</h2>
      <button onClick={() => dispatch(deletePosting(posting._id))} className='close'>
        X
      </button>
      <form onSubmit={onSubmit}>
        <div className='form-grouping'>
          <label htmlFor='text'>Update Posting</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-grouping'>
          <button className='btns btns-block' type='submit'>
            Update Posting
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default PostingItem
