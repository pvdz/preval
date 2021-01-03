# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = {}, c = 30;
$(a = $(b).x = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = 10;
b = {};
c = 30;
tmpObj = $(b);
tmpArg = a = tmpObj.x = c;
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
b = {};
c = 30;
tmpObj = $(b);
tmpArg = a = tmpObj.x = c;
$(tmpArg);
`````
