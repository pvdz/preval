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
var tmpComplexMemberObj;
a = 10;
b = 20;
c = {};
tmpComplexMemberObj = $(c);
b = tmpComplexMemberObj.x;
a = b;
tmpArg = a;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = 8;
var x = 8;
var x = {};
x = x(x);
x = x.x;
x = x;
x = x;
x(x);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
var tmpComplexMemberObj;
a = 10;
b = 20;
c = {};
tmpComplexMemberObj = $(c);
b = tmpComplexMemberObj.x;
a = b;
tmpArg = a;
$(tmpArg);
`````
