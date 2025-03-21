# Preval test case

# boolean_false.md

> Type tracked > Constructors > Boolean false
>
> The Boolean() constructor on a value we know to be bool is a noop

## Input

`````js filename=intro
const x = $(1) === $(2);
$(Boolean(x)); // Is the same as `x` and dropping the `Boolean` call should not be observable
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const x /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(1);
$(tmpBinBothLhs === $(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a === b;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
