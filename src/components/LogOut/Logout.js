import styles from './LogOut.module.scss'
export default function Logout({ user, setUser }) {
function handleLogOut() {
  logOut();
  setUser(null);
}
function logOut () {
  localStorage.removeItem('token')
}

return (
  <div className={styles.UserLogOut}>
    
    
  </div>
);
}