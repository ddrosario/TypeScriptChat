import { app } from './app';

const PORT: number = 1337;

app.listen(PORT, () => {
  console.log('Server is listening to port: ', PORT);
});
