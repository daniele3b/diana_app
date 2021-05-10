# diana_app
Diana is a monitoring platform for chemical agents to be provided to the competent authorities to safeguard the territory. Through the stations located in the area it is possible to analyze the data concerning chemical agents in real time and study their relationship with complementary factors such as:

* Air traffic
* Weathering
* Land traffic
* UV rays

The ability to download and analyze data is provided to make analyzing complex data easier.
We are strongly convinced that environmental protection cannot take place without the active participation of citizens, which is why a mechanism for reporting events that can harm the health of the area has been introduced. Finally, the authorities will have a broadcasting tool available to send important announcements to all users of the system.

# Technologies used

Diana is mainly structured in two modules:

* frontend
* backend

The frontend was built with Vue.js, Javascript, CSS and several libraries:

* Bootstrap
* Axios
* vue2-google-maps
* Chart-js

The backend was built with Nodejs and several libraries:

* Bcrypt
* Mongoose
* Express
* Passport
* Request
* JWT
* Config
* Cors
* Nodemailer
* Amqplib

The communication between frontend and backend takes place through REST calls (Axios), the backend is divided into two modules communicating through AMQP. The second module has also implemented a websocket which will be used for future purposes.


# How to install Diana
The requirements to run Diana are to have installed on your device:

* MongoDB
* RabbitMQ
* Nodejs
* Vue

Follow the steps indicated in the various read me modules:

* Diana-app (frontend): https://github.com/daniele3b/diana_app
* Diana-threshold (module 2 backend): https://github.com/daniele3b/diana-threshold


Follow the steps indicated in the various read me modules:

* Diana (module 1 backend): https://github.com/daniele3b/Progetto-Diana
* Diana-threshold (module 2 backend): https://github.com/daniele3b/diana-threshold

By default Diana (module 1) will make her bees available on port 8081, the frontend will be accessible on port 8080.
To view the interactive documentation after launching Diana (module 1), request the resource 8081 / diana-docs /


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


