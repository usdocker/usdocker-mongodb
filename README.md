# Useful script for 'mongodb' service

This Useful Script creates a mongodb server based on a Docker Image.
You don't have know docker to use this solution.

## Start the mongodb service

```
usdocker mongodb up
```

## Stop the mongodb service

```
usdocker mongodb down
```

## Check the mongodb status

```
usdocker mongodb status
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

