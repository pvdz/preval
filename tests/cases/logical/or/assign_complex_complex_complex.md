# Preval test case

# assign_complex_complex_complex.md

> Logical > Or > Assign complex complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = $(1) || $(2));
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(x);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  $(x);
} else {
  $($(2));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( a );
}
else {
  const b = $( 2 );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(1);
if (x) {
} else {
  x = $(2);
}
let tmpCalleeParam = x;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
