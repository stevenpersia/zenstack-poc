import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import {
  useCreatePost,
  useCreateUser,
  useFindFirstPost,
  useFindManyPost,
  useFindManyUser,
  useFindUniquePost,
  useUpdatePost
} from "./orval/app";

export const Test = () => {
  const { data: posts } = useFindManyPost({ q: { include: { author: true } } });
  const { data: users } = useFindManyUser({ q: {} });

  const { data: post } = useFindUniquePost({
    q: { where: { id: 1 }, include: { author: { select: { name: true } } } }
  });

  console.log({ posts: posts?.data?.data });
  console.log({ users: users?.data?.data });
  console.log({ post: post?.data?.data });

  const { mutate: mutatePost } = useCreatePost();
  const { mutate: mutateUser } = useCreateUser();
  const { mutate: mutateUserPost } = useUpdatePost();

  const createPost = () => {
    mutatePost({ data: { data: { title: "Hey my man", content: "COUCOU", viewCount: 1 } } });
  };

  const createUser = () => {
    mutateUser({ data: { data: { email: "x@x.com", name: "John" } } });
  };

  const updateUser = () => {
    mutateUserPost({ data: { where: { id: 1 }, data: { author: { connect: { id: 4 } } } } });
  };

  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title='Create post' onPress={createPost} />
      <Button title='Create user' onPress={createUser} />
      <Button title='Update post user' onPress={updateUser} />
      <StatusBar style='auto' />
    </View>
  );
};
