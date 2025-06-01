# Preval test case

# alias_to_let_mutated_after.md

> Ternary alias > Ai silly contrived > Alias to let mutated after
>
> Aliased variable is a let and is mutated after the if

## Input

`````js filename=intro
const x = $(true);
let a = 1;
let b = undefined;
if (x) {} else { b = a; }
a = 2;
$(b);
// Expect: No change, a is mutated after the if
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
} else {
  $(1);
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
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = 1;
let b = undefined;
if (x) {
} else {
  b = a;
}
a = 2;
$(b);
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
