# Preval test case

# else_no_consequent_block.md

> If test aliased > Else no consequent block
>
> If statement has an empty consequent block but a populated else block

## Input

`````js filename=intro
// where the alias `a = !c` is used.
// `a` should become `true`.
let c = $(false);
let a = !c;
if (c) {}
else {
  $(a); // Expected: $(true)
}

// Expected:
// let c = $(false);
// let a = !c;
// if (c) {}
// else {
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
let a = !c;
if (c) {
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
