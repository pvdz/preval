# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = {};
b = 20;
c = 30;
tmpObj = $(a);
tmpArg = tmpObj.x = b = c;
$(tmpArg);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpObj;
a = {};
b = 20;
c = 30;
tmpObj = $(a);
tmpArg = tmpObj.x = b = c;
$(tmpArg);
`````