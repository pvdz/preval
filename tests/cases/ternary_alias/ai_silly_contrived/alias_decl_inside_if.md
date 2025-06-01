# Preval test case

# alias_decl_inside_if.md

> Ternary alias > Ai silly contrived > Alias decl inside if
>
> Decl inside if, assignment in same block

## Input

`````js filename=intro
const x = $(true);
if (x) {
  let a = undefined;
  let b = undefined;
  b = a;
  $(b);
}
// Expect: b is replaced with a, b's decl/assign removed
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
if (x) {
  let a = undefined;
  let b = undefined;
  b = a;
  $(a);
} else {
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
