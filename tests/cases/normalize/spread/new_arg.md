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
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let e = 5;
let f = 6;
let g = 7;
let h = 8;
let y = 9;
const tmpNewCallee = y;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = 8;
a = b.c;
d = e[f];
const tmpCompObj = g;
const tmpCalleeParamSpread = tmpCompObj.h;
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1, ...tmpCalleeParamSpread);
`````

## Output

`````js filename=intro
let a = 1;
let d = 4;
const tmpCalleeParam = x;
a = (2).c;
d = (5)[6];
const tmpCalleeParamSpread = (7).h;
new 9(tmpCalleeParam, 8, ...tmpCalleeParamSpread);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
