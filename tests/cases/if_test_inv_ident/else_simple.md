# Preval test case

# else_simple.md

> If test inv ident > Else simple
>
> An alias `a = !c` is used in the `else` branch of `if (c)`.

## Input

`````js filename=intro
// `a` should become `true`.
let c = $(false);
let a = !c;
if (c) {
  $(c);
} else {
  $(a); // Expected: $(true)
}

// Expected:
// let c = $(false);
// let a = !c;
// if (c) {
//   $(c);
// } else {
//   $(true);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
if (c) {
  $(c);
} else {
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(false);
if (c) {
  $(c);
} else {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( a );
}
else {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let a = !c;
if (c) {
  $(c);
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
