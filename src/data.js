// Defining dummy data
const dummyData = {
  users: [
    {
      id: 100, name: 'John', email: 'doe@j.co', age: 20,
    },
    {
      id: 123, name: 'Johnny', email: 'doe@jn.co', age: 24,
    },
    {
      id: 29, name: 'Jane', email: 'd@jane.co', age: 30,
    },
  ],
  posts: [
    {
      id: 89012, title: 'JS 101', body: 'Let\'s get started with JavaScript', author: 123, isPublished: true,
    },
    {
      id: 78932, title: 'React & Redux', body: 'Make more and more components', author: 29, isPublished: true,
    },
    {
      id: 8901323, title: 'Functional JS 101', body: 'Functional JS is the new cool', author: 29, isPublished: false,
    },
    {
      id: 912132, title: 'GraphQL 101', body: 'Now you can query your backend', author: 100, isPublished: false,
    },
  ],
  comments: [
    {
      id: 321, body: 'Well done', user: 123, post: 8901323,
    },
    {
      id: 902, body: 'Nice post', user: 100, post: 8901323,
    },
    {
      id: 321, body: 'Lucid writting', user: 123, post: 912132,
    },
  ],
};

export default dummyData;
