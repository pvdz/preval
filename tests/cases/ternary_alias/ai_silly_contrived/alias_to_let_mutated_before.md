# Preval test case

# alias_to_let_mutated_before.md

> Ternary alias > Ai silly contrived > Alias to let mutated before
>
> Aliased variable is a let and is mutated before the if

## Input

`````js filename=intro
const x = $(true);
let a = 1;
let b = undefined;
a = 2;
if (x) {} else { b = a; }
$(b);
// Expect: b is replaced with a, b's decl/assign removed (if only mutation before)
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( undefined );
}
else {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = 1;
let b = undefined;
a = 2;
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
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
