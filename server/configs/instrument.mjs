import * as Sentry from "@sentry/node"


Sentry.init({
  dsn: "https://7ccec900b6f391abe823506cf23b537d@o4511647716671488.ingest.de.sentry.io/4511647774736465",


  sendDefaultPii: true,
});