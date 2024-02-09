import { useParams } from "react-router-dom";

const User = ({ usersQueryResult }) => {
  if (usersQueryResult.isLoading) {
    return <div>loading data...</div>;
  }

  if (usersQueryResult.isError) {
    return <div>user service not available due to problems in server</div>;
  }

  const users = usersQueryResult.data;

  const id = useParams().id
  const user = users.find(u => u.id === id)
  console.log(user)

  return (
    <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog => {
            return (
                <li key={blog.id}>{blog.title}</li>
            )
          })}
        </ul>
    </div>
  )
};

export default User;