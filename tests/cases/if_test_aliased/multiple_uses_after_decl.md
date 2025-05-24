# Preval test case

# multiple_uses_after_decl.md

> If test aliased > Multiple uses after decl
>
> multiple uses after let alias declaration inside branch, should replace all $(u) with $(false) in if (t)

## Input

`````js filename=intro
if (t) {
  let u = !t;
  $(u); // expect: $(false)
  $(u); // expect: $(false)
}
`````


## Settled


`````js filename=intro
if (t) {
  t;
  $(false);
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (t) {
  t;
  $(false);
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (t) {
  t;
  $( false );
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (t) {
  let u = !t;
  $(u);
  $(u);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

t


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
