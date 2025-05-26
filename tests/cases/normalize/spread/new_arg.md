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
$Number_prototype.c;
$Number_prototype[6];
const tmpObjLitVal /*:array*/ = [7];
new $string_constructor(8.5, 8, ...tmpObjLitVal);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.c;
$Number_prototype[6];
const tmpObjLitVal = [7];
new $string_constructor(8.5, 8, ...tmpObjLitVal);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.c;
$Number_prototype[ 6 ];
const a = [ 7 ];
new $string_constructor( 8.5, 8, ...a );
`````


## Normalized
(This is what phase1 received the first time)

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
let tmpCalleeParam = x;
a = b.c;
d = e[f];
const tmpCompObj = g;
let tmpCalleeParamSpread = tmpCompObj.h;
new tmpNewCallee(tmpCalleeParam, 8, ...tmpCalleeParamSpread);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
