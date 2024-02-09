import { useQuery } from 'react-query';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = ({ usersQueryResult }) => {

  if (usersQueryResult.isLoading) {
    return <div>loading data...</div>;
  }

  if (usersQueryResult.isError) {
    return <div>user service not available due to problems in server</div>;
  }

  const users = usersQueryResult.data;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
