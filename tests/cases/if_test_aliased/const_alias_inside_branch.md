# Preval test case

# const_alias_inside_branch.md

> If test aliased > Const alias inside branch
>
> const alias inside branch, should replace $(s) with $(false) in if (r)

## Input

`````js filename=intro
const r = $(true);
if (r) {
  const s = !r;
  $(s); // expect: $(false)
}
`````


## Settled


`````js filename=intro
const r /*:unknown*/ = $(true);
if (r) {
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
const r = $(true);
if (r) {
  const s = false;
  $(s);
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
