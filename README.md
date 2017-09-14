# Useful script for 'mongodb' service

This Useful Script creates a mongodb server based on a Docker Image.
You don't have know docker to use this solution.

## Installing

```bash
npm install -g @usdocker/usdocker # Install it first
npm install -g @usdocker/mongodb
usdocker -r    # Update USDocker database
```

## Start the mongodb service

```bash
usdocker mongodb up
```

## Stop the mongodb service

```bash
usdocker mongodb down
```

## Check the mongodb status

```bash
usdocker mongodb status
```

## Connect to the MongoDB client


```bash
usdocker mongodb client -- [args]
```


## Customize your service

You can setup the variables by using:

```bash
usdocker mongodb --set variable=value
```

Default values

 - image: "mongo:3",
 - folder: "$HOME/.usdocker/data/mongodb",
 - port: 27017

