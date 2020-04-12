// Defining dummy data
const dummyData = {
  users: [
    {
      id: '06004924-76f8-415b-9158-73d90cf59d4d',
      name: 'John',
      email: 'doe@john.com',
      age: 23,
    },
    {
      id: '010ee8bc-adc1-4d13-9062-561057cc8404',
      name: 'Jane',
      email: 'lob@jane.co',
      age: 30,
    },
    {
      id: 'dfd0365f-a3dd-46d3-a0f0-0290df62e637',
      name: 'Jhonny',
      email: 'j@jhonny.com',
      age: 27,
    },
  ],
  posts: [
    {
      id: 'f478e52a-f413-40cd-991a-061ccd885069',
      title: 'GraphQL 101',
      body: 'Let\'s build flexible APIs',
      author: '06004924-76f8-415b-9158-73d90cf59d4d',
      isPublished: true,
    },
    {
      id: 'd7e7ff2d-dc0a-4b76-8ba6-e967b2631789',
      title: 'JavaScript 101',
      body: 'Learn about the Web and Browser APIs',
      author: '06004924-76f8-415b-9158-73d90cf59d4d',
      isPublished: true,
    },
    {
      id: '5c24fcfa-8d66-46c4-bbd1-3304fb26ac93',
      title: 'GraphQL - The new cool',
      body: 'Use your API like you query your DB',
      author: '010ee8bc-adc1-4d13-9062-561057cc8404',
      isPublished: true,
    },
  ],
  comments: [
    {
      id: '00e70e5d-2302-43ea-b629-0486237f94cd',
      body: 'Nicely Written!',
      post: 'f478e52a-f413-40cd-991a-061ccd885069',
      author: '06004924-76f8-415b-9158-73d90cf59d4d',
    },
    {
      id: 'e5aa9a55-48cc-45b2-be57-6f88afa88669',
      body: 'Iloved it!',
      post: 'f478e52a-f413-40cd-991a-061ccd885069',
      author: '010ee8bc-adc1-4d13-9062-561057cc8404',
    },
  ],
};

export default dummyData;
