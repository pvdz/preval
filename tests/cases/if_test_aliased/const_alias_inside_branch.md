# Preval test case

# const_alias_inside_branch.md

> If test aliased > Const alias inside branch
>
> const alias inside branch, should replace $(s) with $(false) in if (r)

## Input

`````js filename=intro
if (r) {
  const s = !r;
  $(s); // expect: $(false)
}
`````


## Settled


`````js filename=intro
if (r) {
  r;
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (r) {
  r;
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (r) {
  r;
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (r) {
  const s = !r;
  $(s);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

r


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
