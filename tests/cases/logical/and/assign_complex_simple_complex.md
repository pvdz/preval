# Preval test case

# assign_complex_simple_complex.md

> Logical > And > Assign complex simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
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
let x = undefined;
x = 1;
if (x) {
  x = $(2);
} else {
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
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
