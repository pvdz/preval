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
const tmpCallObj = x;
const tmpCallVal = tmpCallObj.y;
const tmpCalleeParam = x;
const tmpCalleeParam$1 = 8;
a = b.c;
d = e[f];
const tmpCompObj = g;
const tmpCalleeParamSpread = tmpCompObj.h;
tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1, ...tmpCalleeParamSpread);
`````

## Output

`````js filename=intro
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
const tmpCallVal = x.y;
a = b.c;
d = e[f];
const tmpCalleeParamSpread = g.h;
tmpCallVal.call(x, x, 8, ...tmpCalleeParamSpread);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
