# Preval test case

# var_complex_simple.md

> Logical > And > Var complex simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
const x = $(1) && 2;
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(2);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  $(2);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
