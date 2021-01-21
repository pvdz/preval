# Preval test case

# call_arg.md

> normalize > spread > call_arg
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
var a,b,c,d,e,f,g,h,x,y;
x.y(x, 8, ...((a = b.c), (d = e[f]), g).h);
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
var x;
var y;
tmpArg = x;
a = b.c;
d = e[f];
tmpArg_1 = g.h;
x.y(tmpArg, 8, ...tmpArg_1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var a;
var d;
tmpArg = undefined;
a = undefined.c;
d = undefined[undefined];
tmpArg_1 = undefined.h;
undefined.y(tmpArg, 8, ...tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: BAD?!
["<crash[ Cannot read property 'c' of undefined ]>"];

Final output calls: BAD!!
["<crash[ Cannot read property 'c' of undefined ]>"];

