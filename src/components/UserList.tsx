import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, addUser, User as ApiUser } from '../api';

type User = Required<ApiUser>;
const DEFAULT_AVATAR = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

const UserList: React.FC = () => {
  const queryClient = useQueryClient();
  const [userLimit, setUserLimit] = useState(5);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    password: '',
    avatar: DEFAULT_AVATAR
  });
  const [error, setError] = useState<string | null>(null);

  const { data: users, isLoading, error: fetchError } = useQuery<User[]>({
    queryKey: ['users', userLimit],
    queryFn: () => fetchUsers(userLimit),
  });

  const mutation = useMutation<User, Error, Omit<User, 'id'>>({
    mutationFn: addUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['users', userLimit], (oldData: User[] | undefined) => {
        return oldData ? [...oldData, data] : [data];
      });
      setNewUser({ name: '', email: '', password: '', avatar: DEFAULT_AVATAR });
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.password) {
      mutation.mutate(newUser);
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (fetchError) return <div className="text-center py-4 text-red-500">Error fetching users</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">User List</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="border rounded p-2 mr-2"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="border rounded p-2 mr-2"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="border rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2">Add User</button>
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users && users.map((user) => (
          <li key={user.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="flex items-center p-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;