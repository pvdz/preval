# Preval test case

# nested_simple.md

> normalize > assignment > nested_simple
>
> Nested assignments should be split up

#TODO

## Input

`````js filename=intro
var a = 10, b = 20, c = 30;
$(a = b = c);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var tmpArg;
a = 10;
b = 20;
c = 30;
b = c;
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
a = 10;
b = 20;
c = 30;
b = c;
a = b;
tmpArg = a;
$(tmpArg);
`````
