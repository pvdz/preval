# Preval test case

# assign_simple_complex_simple.md

> Logical > Or > Assign simple complex simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = $(1) || 2);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(x);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
if (x) {
  $(x);
} else {
  $(2);
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
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(1);
if (x) {
} else {
  x = 2;
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
