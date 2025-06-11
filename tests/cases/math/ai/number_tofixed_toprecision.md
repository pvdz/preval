# Preval test case

# number_tofixed_toprecision.md

> Math > Ai > Number tofixed toprecision
>
> Number.toFixed and Number.toPrecision edge cases

## Input

`````js filename=intro
const a = $(123.456);
const b = a.toFixed(2);
const c = a.toPrecision(4);
const d = (1.005).toFixed(2);
$(b);
$(c);
$(d);
// Should be "123.46", "123.5", "1.01"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(123.456);
const tmpMCF /*:unknown*/ = a.toFixed;
const b /*:unknown*/ = $dotCall(tmpMCF, a, `toFixed`, 2);
const tmpMCF$1 /*:unknown*/ = a.toPrecision;
const c /*:unknown*/ = $dotCall(tmpMCF$1, a, `toPrecision`, 4);
$(b);
$(c);
$(`1.00`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(123.456);
const b = a.toFixed(2);
const c = a.toPrecision(4);
$(b);
$(c);
$(`1.00`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123.456 );
const b = a.toFixed;
const c = $dotCall( b, a, "toFixed", 2 );
const d = a.toPrecision;
const e = $dotCall( d, a, "toPrecision", 4 );
$( c );
$( e );
$( "1.00" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(123.456);
const tmpMCF = a.toFixed;
const b = $dotCall(tmpMCF, a, `toFixed`, 2);
const tmpMCF$1 = a.toPrecision;
const c = $dotCall(tmpMCF$1, a, `toPrecision`, 4);
const tmpMCF$3 = $number_toFixed;
const d = `1.00`;
$(b);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 123.456
 - 2: '123.46'
 - 3: '123.5'
 - 4: '1.00'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
