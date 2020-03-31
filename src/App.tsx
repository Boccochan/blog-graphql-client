import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Blog from './components/Blog';
// import ApolloClient, { HttpLink } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { createHttpLink, HttpLink} from 'apollo-link-http';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import {gql, InMemoryCache} from 'apollo-boost';
// import { Mutation } from "react-apollo";
import {setContext} from 'apollo-link-context';

const ME_INFO = gql `
  {
    me {
      id
      userName
    }
  }
`
interface LoginInput {
  email: String;
  password: String;
};

interface UserResult {
  id: String;
  userName: String;
  email: String;
  site: String;
  createdAt: String;
  updateAt: String;
};

const LOGIN = gql `
mutation Login($data: LoginInput!) {
  login(data: $data) {
    id
    userName
    email
    createdAt
  }
}
`

// const GetMe = () => {
//   const {loading, data} = useQuery<UserResult>(ME_INFO);

//   // if(loading) return <p>Loading...</p>;
//   console.log(loading)
//   console.log(data)
// }

const GetMeInfo = () => {
  // const {loading, data} = useQuery<UserResult>(ME_INFO);

  const {loading, data, refetch} = useQuery<UserResult>(ME_INFO);
  if(loading) return <p>Loading...</p>;
  // console.log(data)

  return (
    <div>
      <button onClick={() => 
        { 
          refetch();
          console.log(data) 
        }
      }>
        Me
      </button>
    </div>
  )
}

const Login = () => {
  const [login, {error, data}] = useMutation<{login: UserResult}, {data: LoginInput}>(
    LOGIN, 
    {
      // update: (_proxy, response) => {
      //   console.log("hogehogehoge")
      //   console.log(response);
      // },
      variables: { 
        data: {email: "hoge2@hoge.com", password: "123456"} as LoginInput
      }
    }
  );
  // let toggle = false;
  console.log(error, data);

  return (
    <div>
      <button onClick={() => {
        login().then(result => {
          console.log('----------------')
          console.log(result);
          // toggle = true;
        });

      }}>
        Login
      </button>

    </div>
  );
}

// const context = setContext((_, {headers}) => {
//   return {
//     headers: { ...Headers, token: localStorage.getItem("qid") }
//   }
// });

// const link = context.concat(createHttpLink({
//   uri: 'http://localhost:4000/graphql'
//   // credentials: 'same-origin'
// }));


// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'include'
//   })
// })

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app</h2>

        <GetMeInfo />
      </div>
      <Login />
    </ApolloProvider>
    // <Blog userName='Hello!' first={1} last={2}/>
  );
}

export default App;
