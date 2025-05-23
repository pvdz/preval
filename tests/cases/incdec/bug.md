# Preval test case

# bug.md

> Incdec > Bug

This was causing eval disparity at the time of writing.

This was because the value assigned to the property was not incremented
when the operator was postfix. That was a bug, obviously, as only the 
result of the unary expression should be the "unchanged but coerced"
number value, and the member expression is always assigned the increment.

## Input

`````js filename=intro
let b = { x: 1 };
const t = $(b);
const y = t.x++;
$(b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpUpdObj /*:unknown*/ = $(b);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $(b);
tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) + 1;
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b.x;
const d = $coerce( c, "number" );
const e = d + 1;
b.x = e;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
const t = $(b);
const tmpUpdObj = t;
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
const y = tmpUpdNum;
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
