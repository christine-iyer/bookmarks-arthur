import styles from './CreateBlog.module.scss'



export default function CreateBlog ({
  createBlog,
  blog,
  handleChange
}
) {
  return (
    <div className={styles.CreateBlog}>
      <h2 className={styles.NewBlog}>Create A Blog</h2>
      <div className={styles.container}>
        <form 
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            createBlog()
          }}
        >
          
          <label>Title
            <input 
            className={styles.title}
            type='text' 
            value={blog.title} 
            name='title' 
            onChange={handleChange} 
            placeholder='Title' 
            />
          </label>

          <label>Url
            <input className={styles.url}
            type='text' 
            value={blog.url} 
            name='url' 
            onChange={handleChange} 
            placeholder='URL' />
          </label>

          <label>Pick a category:
            <select 
            
            options={blog.category} 
            value={blog.category} 
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
          value='Create Blog' />

        </form>
      </div>
     
    </div>
  )
}
