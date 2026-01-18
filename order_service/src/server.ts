import { APP_PORT } from './config/index.ts';
import expressApp from './expressApp.ts'

const PORT = APP_PORT || 10000;

export const startServer = async () => {

  expressApp.listen(PORT, (error) => {
    if (error) {
      return console.error(error)
    }
    console.log(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  })
}

startServer().then(() => {
  console.log("Server is up");
})