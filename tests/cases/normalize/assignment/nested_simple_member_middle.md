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
var tmpComplexMemberObj;
a = 10;
b = {};
c = 30;
tmpComplexMemberObj = $(b);
tmpComplexMemberObj.x = c;
a = c;
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
var x = {};
var x = 8;
x = x(x);
x.x = x;
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
b = {};
c = 30;
tmpComplexMemberObj = $(b);
tmpComplexMemberObj.x = c;
a = c;
tmpArg = a;
$(tmpArg);
`````
