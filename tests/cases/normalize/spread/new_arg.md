# Preval test case

# call_arg.md

> normalize > spread > call_arg
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
let a=1,b=2,c=3,d=4,e=5,f=6,g=7,h=8,y=9;
new y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let e = 5;
let f = 6;
let g = 7;
let h = 8;
let y = 9;
tmpArg = x;
a = b.c;
d = e[f];
tmpArg$1 = g.h;
new y(tmpArg, 8, ...tmpArg$1);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
let a = 1;
let d = 4;
tmpArg = x;
a = (2).c;
d = (5)[6];
tmpArg$1 = (7).h;
new 9(tmpArg, 8, ...tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
