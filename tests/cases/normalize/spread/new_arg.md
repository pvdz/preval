# Preval test case

# new_arg.md

> Normalize > Spread > New arg
>
> Spread should normalize itself

## Input

`````js filename=intro
let a=1,b=2,c=3,d=4,e=5,f=6,g={h:[7]},h=8,x=8.5,y=String;
new y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````

## Settled


`````js filename=intro
(2).c;
(5)[6];
const tmpObjLitVal /*:array*/ = [7];
new String(8.5, 8, ...tmpObjLitVal);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
(2).c;
(5)[6];
const tmpObjLitVal = [7];
new String(8.5, 8, ...tmpObjLitVal);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6,
  g = { h: [7] },
  h = 8,
  x = 8.5,
  y = String;
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
a = b.c;
d = e[f];
const tmpCompObj = g;
const tmpCalleeParamSpread = tmpCompObj.h;
new tmpNewCallee(tmpCalleeParam, 8, ...tmpCalleeParamSpread);
`````

## PST Settled
With rename=true

`````js filename=intro
2.c;
5[ 6 ];
const a = [ 7 ];
new String( 8.5, 8, ...a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
