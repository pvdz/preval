# Preval test case

# alias_different_primitive.md

> Ternary alias > Ai silly contrived > Alias different primitive
>
> Vars initialized to different primitives: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = 1;
let b = 2;
if (x) {} else { b = a; }
$(b);
// Expect: No change, initial values differ
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(2);
} else {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(2);
} else {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 2 );
}
else {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = 1;
let b = 2;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
