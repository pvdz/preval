# Preval test case

# const_alias_outside_branch.md

> If test aliased > Const alias outside branch
>
> const alias outside branch, should replace $(b) with $(false) in if (d)

## Input

`````js filename=intro
const b = !d;
if (d) {
  $(b); // expect: $(false)
}
`````


## Settled


`````js filename=intro
if (d) {
  d;
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (d) {
  d;
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (d) {
  d;
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = !d;
if (d) {
  $(b);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
