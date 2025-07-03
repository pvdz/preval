# Preval test case

# memproppp.md

> Incdec > Inc > Memproppp
>
>

## Input

`````js filename=intro
let y = $($spy(100)).x++;
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
$(tmpUpdNum);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($spy(100));
const tmpUpdNum = Number(tmpUpdObj.x);
tmpUpdObj.x = tmpUpdNum + 1;
$(tmpUpdNum);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = b.x;
const d = $coerce( c, "number" );
const e = d + 1;
b.x = e;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy(100);
const tmpUpdObj = $(tmpCalleeParam);
const tmpUpdProp = tmpUpdObj.x;
const tmpUpdNum = $coerce(tmpUpdProp, `number`);
const tmpUpdInc = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
let y = tmpUpdNum;
$(tmpUpdNum);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
