# Preval test case

# var_complex_complex.md

> Logical > And > Var complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
const x = $(1) && $(2);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(2);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
} else {
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
