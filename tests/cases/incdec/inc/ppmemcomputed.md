# Preval test case

# ppmemcomputed.md

> Incdec > Inc > Ppmemcomputed
>
>

## Input

`````js filename=intro
let x = ++$($spy(100))[$spy(1)];
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $spy(100);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = $spy(1);
const tmpUpdVal /*:unknown*/ = tmpUpdObj[tmpUpdProp];
const tmpUpdNum /*:number*/ = $coerce(tmpUpdVal, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj[tmpUpdProp] = tmpUpdInc;
$(tmpUpdInc);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdObj = $($spy(100));
const tmpUpdProp = $spy(1);
const tmpUpdInc = $coerce(tmpUpdObj[tmpUpdProp], `number`) + 1;
tmpUpdObj[tmpUpdProp] = tmpUpdInc;
$(tmpUpdInc);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 100 );
const b = $( a );
const c = $spy( 1 );
const d = b[ c ];
const e = $coerce( d, "number" );
const f = e + 1;
b[c] = f;
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [100, 100]
 - 2: '<spy[1]>'
 - 3: 'Creating spy', 2, 1, [1, 1]
 - 4: '$spy[2].toString()', 1
 - 5: '$spy[2].toString()', 1
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
