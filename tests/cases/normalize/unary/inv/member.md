# Preval test case

# member.md

> normalize > unary > inv > member
>
> Inverting a member expression is two things

#TODO

## Input

`````js filename=intro
$(!Date.length);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = Date.length;
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x.x;
x = typeof x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = Date.length;
tmpArg = !tmpUnaryArg;
$(tmpArg);
`````
