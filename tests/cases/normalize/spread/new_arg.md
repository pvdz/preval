# Preval test case

# call_arg.md

> normalize > spread > call_arg
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
let a=1,b=2,c=3,d=4,e=5,f=6,g={h:[7]},h=8,x=8.5,y=String;
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
const tmpObjLitVal = [7];
let g = { h: tmpObjLitVal };
let h = 8;
let x = 8.5;
let y = String;
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
const tmpObjLitVal = [7];
const g = { h: tmpObjLitVal };
a = (2).c;
d = (5)[6];
const tmpCalleeParamSpread = g.h;
new String(8.5, 8, ...tmpCalleeParamSpread);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
