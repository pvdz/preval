# Preval test case

# number_valueof_vs_tostring.md

> Math > Ai > Number valueof vs tostring
>
> valueOf vs toString on numbers

## Input

`````js filename=intro
const a = $(42);
const b = a.valueOf();
const c = a.toString();
$(b);
$(c);
// Should be 42, "42"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(42);
const tmpMCF /*:unknown*/ = a.valueOf;
const b /*:unknown*/ = $dotCall(tmpMCF, a, `valueOf`);
const tmpMCF$1 /*:unknown*/ = a.toString;
const c /*:unknown*/ = $dotCall(tmpMCF$1, a, `toString`);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(42);
const b = a.valueOf();
const c = a.toString();
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = a.valueOf;
const c = $dotCall( b, a, "valueOf" );
const d = a.toString;
const e = $dotCall( d, a, "toString" );
$( c );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(42);
const tmpMCF = a.valueOf;
const b = $dotCall(tmpMCF, a, `valueOf`);
const tmpMCF$1 = a.toString;
const c = $dotCall(tmpMCF$1, a, `toString`);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: 42
 - 3: '42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
