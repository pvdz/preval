# Preval test case

# var_simple_complex.md

> Logical > And > Var simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
const x = 1 && $(2);
$(x);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
if (x) {
  x = $(2);
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
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
