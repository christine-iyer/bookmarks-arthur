
export default function setClass(blog, styles){
     if(blog.category === 'Work'){
          return styles.work
     }
     if(blog.category === 'Family'){
          return styles.family
     }
     if(blog.category === 'Code'){
          return styles.code
     }
     if(blog.category === 'Misc'){
          return styles.misc
     }
     if(blog.category === 'Friends'){
          return styles.friends
     }

     

}
