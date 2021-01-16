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
var tmpArg;
var tmpArg_1;
var a;
var b;
var c;
var d;
var e;
var f;
var g;
var h;
var y;
tmpArg = x;
a = b.c;
d = e[f];
tmpArg_1 = g.h;
new y(tmpArg, 8, ...tmpArg_1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var a;
var d;
tmpArg = x;
a = undefined.c;
d = undefined[undefined];
tmpArg_1 = undefined.h;
new undefined(tmpArg, 8, ...tmpArg_1);
`````
