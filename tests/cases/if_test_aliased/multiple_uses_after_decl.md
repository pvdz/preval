# Preval test case

# multiple_uses_after_decl.md

> If test aliased > Multiple uses after decl
>
> multiple uses after let alias declaration inside branch, should replace all $(u) with $(false) in if (t)

## Input

`````js filename=intro
const t = $(true);
if (t) {
  let u = !t;
  $(u); // expect: $(false)
  $(u); // expect: $(false)
}
`````


## Settled


`````js filename=intro
const t /*:unknown*/ = $(true);
if (t) {
  $(false);
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const t = $(true);
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


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
