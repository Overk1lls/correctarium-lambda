# correctarium-lambda

## Usage
Perform a POST request to the endpoint ```/api/text``` with a body that contains the following:
```
{
  "text": "text to translate or edit",
  "fileType": "mock type of the file ('doc', 'docx', 'rtf', other)"
}
```

If ```FileType``` is not one of the ```['doc', 'docx', 'rtf']``` then price and time will be 20% higher.

Response will be something like this:
```
{
    "result": {
        "cost": 99,
        "time": "1.985371342835709 hours",
        "whenReady": "01.12.2021, 16:00:00"
    }
}
```
