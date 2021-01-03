# Preval test case

# nested_complex_c.md

> normalize > assignment > nested_complex_c
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = [];
$(a = b = $(c).length);
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
c = [];
tmpObj = $(c);
tmpArg = a = b = tmpObj.length;
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
c = [];
tmpObj = $(c);
tmpArg = a = b = tmpObj.length;
$(tmpArg);
`````
