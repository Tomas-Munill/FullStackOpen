import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap"; 

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

  return (
    <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ListGroup>
          {user.blogs.map(blog => {
            return (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
            )
          })}
        </ListGroup>
    </div>
  )
};

export default User;