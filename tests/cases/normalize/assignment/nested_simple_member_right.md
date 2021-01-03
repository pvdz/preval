# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = {};
$(a = b = $(c).x);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = 10;
b = 20;
c = {};
tmpObj = $(c);
b = tmpObj.x;
a = b;
tmpArg = a;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = 10;
b = 20;
c = {};
tmpObj = $(c);
b = tmpObj.x;
a = b;
tmpArg = a;
$(tmpArg);
`````
