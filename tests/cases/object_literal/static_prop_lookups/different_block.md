# Preval test case

# different_block.md

> Object literal > Static prop lookups > Different block
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {x: $(1)};
if ($) {
  $(o.x);
}
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
if ($) {
  $(tmpObjLitVal);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
if ($) {
  $(tmpObjLitVal);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if ($) {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
if ($) {
  let tmpCalleeParam = o.x;
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
