# Preval test case

# const_alias_outside_branch.md

> If test aliased > Const alias outside branch
>
> const alias outside branch, should replace $(b) with $(false) in if (d)

## Input

`````js filename=intro
const d = $(true);
const b = !d;
if (d) {
  $(b); // expect: $(false)
}
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $(true);
if (d) {
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
const d = $(true);
const b = !d;
if (d) {
  $(b);
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
