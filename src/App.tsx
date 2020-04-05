import React from "react";
import "./App.css";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { gql, InMemoryCache } from "apollo-boost";
import { BlogList, BlogMetaInfo } from "./components/BlogList";

const ME_INFO = gql`
  {
    me {
      id
      userName
    }
  }
`;

interface LoginInput {
  email: String;
  password: String;
}

interface UserResult {
  id: String;
  userName: String;
  email: String;
  site: String;
  createdAt: String;
  updateAt: String;
}

const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      userName
      email
      createdAt
    }
  }
`;

const GetMeInfo = () => {
  const { loading, data, refetch } = useQuery<UserResult>(ME_INFO);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <button
        onClick={() => {
          refetch();
          console.log(data);
        }}
      >
        Me
      </button>
    </div>
  );
};

const Login = () => {
  const [login, { error, data }] = useMutation<
    { login: UserResult },
    { data: LoginInput }
  >(LOGIN, {
    variables: {
      data: { email: "hoge2@hoge.com", password: "123456" } as LoginInput,
    },
  });
  console.log(error, data);

  return (
    <div>
      <button
        onClick={() => {
          login().then((result) => {
            console.log("----------------");
            console.log(result);
            // toggle = true;
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app</h2>

        <GetMeInfo />
      </div>
      <Login />
      <BlogList
        blogList={[
          {
            avatar: "/static/images/avatar/1.jpg",
            author: "Boccochan",
            title: "This is test title.",
            keyword: ["Typescript", "React"],
          } as BlogMetaInfo,
          {
            avatar: "/static/images/avatar/1.jpg",
            author: "Hohochan",
            title: "This is not test title. But this is real fantasy.",
            keyword: ["python3", "django"],
          } as BlogMetaInfo,
        ]}
      />
    </ApolloProvider>
  );
}

export default App;
