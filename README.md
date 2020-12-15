
## Get Started
```bash
$ docker build -t challenge .
$ docker run -i -v /path/to/test/config.json:/auction/config.json \
 -v /path/to/test/input.json:/auction/input.json challenge
```

## Run Tests
```bash
npm run test
```