# Preval test case

# string.md

> Type tracked > Constructors > String
>
> The String() constructor on a value we know to be bool is a noop

## Input

`````js filename=intro
const x = "" + $(1);
$(String(x)); // Is the same as `x` and dropping the `String` call should not be observable
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpCalleeParam /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(1), `plustr`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "plustr" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam = $coerce(x, `string`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
