# Preval test case

# alias_const_permissive.md

> Ternary alias > Ai silly contrived > Alias const permissive
>
> Aliased variable is a const, should allow aliasing

## Input

`````js filename=intro
const x = $(true);
const a = 42;
let b = undefined;
if (x) {} else { b = a; }
$(b);
// Expect: b is replaced with a, b's decl/assign removed
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
  $(42);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
} else {
  $(42);
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
  $( 42 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const a = 42;
let b = undefined;
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
