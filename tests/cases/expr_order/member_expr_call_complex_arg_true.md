# Preval test case

# member_expr_call_complex_arg_true.md

> Expr order > Member expr call complex arg true
>
> calling method with property arg should resolve in correct order

## Input

`````js filename=intro
var a = true, x = false;
a.b(x.y);
`````

## Settled


`````js filename=intro
const tmpCallVal /*:unknown*/ = true.b;
const tmpCalleeParam /*:unknown*/ = false.y;
$dotCall(tmpCallVal, true, `b`, tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(true.b, true, `b`, false.y);
`````

## Pre Normal


`````js filename=intro
let a = undefined;
let x = undefined;
(a = true), (x = false);
a.b(x.y);
`````

## Normalized


`````js filename=intro
let a = undefined;
let x = undefined;
a = true;
x = false;
const tmpCallObj = a;
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = x.y;
$dotCall(tmpCallVal, tmpCallObj, `b`, tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = true.b;
const b = false.y;
$dotCall( a, true, "b", b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
