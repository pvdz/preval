# Preval test case

# number_toexponential.md

> Math > Ai > Number toexponential
>
> Number.toExponential edge cases

## Input

`````js filename=intro
const a = $(123456);
const b = a.toExponential();
const c = a.toExponential(2);
const d = (0.0001234).toExponential(3);
$(b);
$(c);
$(d);
// Should be "1.23456e+5", "1.23e+5", "1.234e-4"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(123456);
const tmpMCF /*:unknown*/ = a.toExponential;
const b /*:unknown*/ = $dotCall(tmpMCF, a, `toExponential`);
const tmpMCF$1 /*:unknown*/ = a.toExponential;
const c /*:unknown*/ = $dotCall(tmpMCF$1, a, `toExponential`, 2);
$(b);
$(c);
$(`1.234e-4`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(123456);
const b = a.toExponential();
const c = a.toExponential(2);
$(b);
$(c);
$(`1.234e-4`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123456 );
const b = a.toExponential;
const c = $dotCall( b, a, "toExponential" );
const d = a.toExponential;
const e = $dotCall( d, a, "toExponential", 2 );
$( c );
$( e );
$( "1.234e-4" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(123456);
const tmpMCF = a.toExponential;
const b = $dotCall(tmpMCF, a, `toExponential`);
const tmpMCF$1 = a.toExponential;
const c = $dotCall(tmpMCF$1, a, `toExponential`, 2);
const tmpMCF$3 = $number_toExponential;
const d = `1.234e-4`;
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
 - 1: 123456
 - 2: '1.23456e+5'
 - 3: '1.23e+5'
 - 4: '1.234e-4'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
