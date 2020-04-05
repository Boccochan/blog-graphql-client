import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

interface SignInput {
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

const LoginQuery = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      userName
      email
      createdAt
    }
  }
`;

export default function Signin() {
  const [login, { error, data }] = useMutation<
    { login: UserResult },
    { data: SignInput }
  >(LoginQuery, {
    variables: {
      data: { email: "hoge2@hoge.com", password: "123456" } as SignInput,
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
          });
        }}
      >
        Login
      </button>
    </div>
  );
}
