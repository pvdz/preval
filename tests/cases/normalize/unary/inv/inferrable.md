# Preval test case

# inferrable.md

> Normalize > Unary > Inv > Inferrable
>
> In this case we could infer the value of the variable because it is inverted after having seen it checked.

## Input

`````js filename=intro
const x = $(true);
if (x) {
  // This should print false and we should be able to infer that and eliminate all the things
  $(!x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
if (x) {
  let tmpCalleeParam = false;
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
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
