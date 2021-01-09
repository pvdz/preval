# Preval test case

# call_arg.md

> normalize > spread > call_arg
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
var a,b,c,d,e,f,g,h,y;
new y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````

## Normalized

`````js filename=intro
var tmpCallSpreadArg;
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var y;
a = b.c;
d = e[f];
tmpCallSpreadArg = g.h;
new y(x, 8, ...tmpCallSpreadArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
x = x.x;
x = x[x];
x = x.x;
new x(x, 8, ...x);
`````

## Output

`````js filename=intro
var tmpCallSpreadArg;
var a;
var d;
a = undefined.c;
d = undefined[undefined];
tmpCallSpreadArg = undefined.h;
new undefined(x, 8, ...tmpCallSpreadArg);
`````
