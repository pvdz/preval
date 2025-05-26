# Preval test case

# else_alias_decl_in_else.md

> If test inv ident > Else alias decl in else
>
> Alias `a = !c` is declared inside the `else` block itself where it's used.

## Input

`````js filename=intro
// `a` should become `true`.
let c = $(false);
if (c) {
  // ...
} else {
  let a = !c;
  $(a); // Expected: $(true)
}

// Expected:
// let c = $(false);
// if (c) {
//   // ...
// } else {
//   let a = !c;
//   $(true);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
if (c) {
} else {
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
if (c) {
} else {
  let a = !c;
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
