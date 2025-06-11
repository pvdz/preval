# Preval test case

# number_parseint_parsefloat.md

> Math > Ai > Number parseint parsefloat
>
> Number.parseInt and Number.parseFloat edge cases

## Input

`````js filename=intro
const a = $(Number.parseInt("0x10"));
const b = $(Number.parseInt("010", 8));
const c = $(Number.parseFloat("1.23e2"));
const d = $(Number.parseFloat("foo"));
$(a);
$(b);
$(c);
$(d);
// Should be 16, 8, 123, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(16);
const b /*:unknown*/ = $(8);
const c /*:unknown*/ = $(123);
const d /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(16);
const b = $(8);
const c = $(123);
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 16 );
const b = $( 8 );
const c = $( 123 );
const d = $( $Number_NaN );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Number_parseInt;
let tmpCalleeParam = 16;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Number_parseInt;
let tmpCalleeParam$1 = 8;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Number_parseFloat;
let tmpCalleeParam$3 = 123;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Number_parseFloat;
let tmpCalleeParam$5 = NaN;
const d = $($Number_NaN);
$(a);
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
 - 1: 16
 - 2: 8
 - 3: 123
 - 4: NaN
 - 5: 16
 - 6: 8
 - 7: 123
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
