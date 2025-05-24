# Preval test case

# let_alias_inside_branch.md

> If test aliased > Let alias inside branch
>
> let alias inside branch, should replace $(q) with $(false) in if (p)

## Input

`````js filename=intro
if (p) {
  let q = !p;
  $(q); // expect: $(false)
}
`````


## Settled


`````js filename=intro
if (p) {
  p;
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (p) {
  p;
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (p) {
  p;
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (p) {
  let q = !p;
  $(q);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

p


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
