# Preval test case

# math_with_nullish_coalescing.md

> Math > Ai > Math with nullish coalescing
>
> Math.abs with nullish coalescing

## Input

`````js filename=intro
const a = null;
const b = $(Math.abs(a ?? -5));
$(b);
// Should be 5
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(5);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = null;
const tmpMCF = $Math_abs;
let tmpMCP = a;
const tmpIfTest = tmpMCP == null;
if (tmpIfTest) {
  tmpMCP = -5;
} else {
}
let tmpCalleeParam = $dotCall(tmpMCF, Math, `abs`, tmpMCP);
const b = $(tmpCalleeParam);
$(b);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
