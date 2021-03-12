# Preval test case

# call_arg_complex.md

> Normalize > Spread > Call arg complex
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
var a,b,c,d,e,f,g,h,x,y;
x.y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let f = undefined;
let g = undefined;
let h = undefined;
let x = undefined;
let y = undefined;
x.y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let f = undefined;
let g = undefined;
let h = undefined;
let x = undefined;
let y = undefined;
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
undefined.y;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
