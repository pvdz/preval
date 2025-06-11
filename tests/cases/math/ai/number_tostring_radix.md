# Preval test case

# number_tostring_radix.md

> Math > Ai > Number tostring radix
>
> Number.toString with various radix values

## Input

`````js filename=intro
const a = $(255);
const b = a.toString(2);
const c = a.toString(8);
const d = a.toString(16);
const e = a.toString(36);
$(b);
$(c);
$(d);
$(e);
// Should be "11111111", "377", "ff", "73"
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(255);
const tmpMCF /*:unknown*/ = a.toString;
const b /*:unknown*/ = $dotCall(tmpMCF, a, `toString`, 2);
const tmpMCF$1 /*:unknown*/ = a.toString;
const c /*:unknown*/ = $dotCall(tmpMCF$1, a, `toString`, 8);
const tmpMCF$3 /*:unknown*/ = a.toString;
const d /*:unknown*/ = $dotCall(tmpMCF$3, a, `toString`, 16);
const tmpMCF$5 /*:unknown*/ = a.toString;
const e /*:unknown*/ = $dotCall(tmpMCF$5, a, `toString`, 36);
$(b);
$(c);
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(255);
const b = a.toString(2);
const c = a.toString(8);
const d = a.toString(16);
const e = a.toString(36);
$(b);
$(c);
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 255 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 2 );
const d = a.toString;
const e = $dotCall( d, a, "toString", 8 );
const f = a.toString;
const g = $dotCall( f, a, "toString", 16 );
const h = a.toString;
const i = $dotCall( h, a, "toString", 36 );
$( c );
$( e );
$( g );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(255);
const tmpMCF = a.toString;
const b = $dotCall(tmpMCF, a, `toString`, 2);
const tmpMCF$1 = a.toString;
const c = $dotCall(tmpMCF$1, a, `toString`, 8);
const tmpMCF$3 = a.toString;
const d = $dotCall(tmpMCF$3, a, `toString`, 16);
const tmpMCF$5 = a.toString;
const e = $dotCall(tmpMCF$5, a, `toString`, 36);
$(b);
$(c);
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 255
 - 2: '11111111'
 - 3: '377'
 - 4: 'ff'
 - 5: '73'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
