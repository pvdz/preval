# Preval test case

# nested_complex_b.md

> normalize > assignment > nested_complex_b
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = [], c = 30;
$(a = $(b).length = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = 10;
b = [];
c = 30;
tmpObj = $(b);
tmpArg = a = tmpObj.length = c;
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
b = [];
c = 30;
tmpObj = $(b);
tmpArg = a = tmpObj.length = c;
$(tmpArg);
`````
