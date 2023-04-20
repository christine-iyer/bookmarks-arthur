import styles from './CreateBookmark.module.scss'



export default function CreateBookmark ({
  createBookmark,
  bookmark,
  handleChange
}
) {
  return (
    <div className={styles.CreateBookmark}>
      <h2 className={styles.NewBookmark}>Create A Bookmark</h2>
      <div className={styles.container}>
        <form 
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            createBookmark()
          }}
        >
          
          <label>Title
            <input 
            className={styles.title}
            type='text' 
            value={bookmark.title} 
            name='title' 
            onChange={handleChange} 
            placeholder='Title' 
            />
          </label>

          <label>Url
            <input className={styles.url}
            type='text' 
            value={bookmark.url} 
            name='url' 
            onChange={handleChange} 
            placeholder='URL' />
          </label>

          <label>Pick a category:
            <select 
            
            options={bookmark.category} 
            value={bookmark.category} 
            onChange={handleChange} 
            placeholder='Category'
            name="category">
              <option value="Family">Family</option>
              <option  value="Friends">Friends</option>
              <option  value="Work">Work</option>
              <option  value="Code">Code</option>
              <option  value="Misc">Misc</option>
            </select>
            </label>

          <input className={styles.button} 
          type='submit' 
          value='Create Bookmark' />

        </form>
      </div>
     
    </div>
  )
}
