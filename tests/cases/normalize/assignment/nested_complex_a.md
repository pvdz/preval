# Preval test case

# nested_complex_a.md

> normalize > assignment > nested_complex_a
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = [], b = 20, c = 30;
$($(a).length = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = [];
b = 20;
c = 30;
tmpObj = $(a);
tmpArg = tmpObj.length = b = c;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = [];
b = 20;
c = 30;
tmpObj = $(a);
tmpArg = tmpObj.length = b = c;
$(tmpArg);
`````
