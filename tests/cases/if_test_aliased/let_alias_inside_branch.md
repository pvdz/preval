# Preval test case

# let_alias_inside_branch.md

> If test aliased > Let alias inside branch
>
> let alias inside branch, should replace $(q) with $(false) in if (p)

## Input

`````js filename=intro
const p = $(true);
if (p) {
  let q = !p;
  $(q); // expect: $(false)
}
`````


## Settled


`````js filename=intro
const p /*:unknown*/ = $(true);
if (p) {
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
const p = $(true);
if (p) {
  let q = false;
  $(q);
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
