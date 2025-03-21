import app from "./app";
import config from "../utils/config";
import { info } from "../utils/logger";

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
})
