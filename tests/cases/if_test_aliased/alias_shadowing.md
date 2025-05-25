# Preval test case

# alias_shadowing.md

> If test aliased > Alias shadowing
>
> shadowing: inner block declares new let a, should NOT replace $(a) in inner block

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  {
    let a = true;
    $(a); // expect: $(a)
  }
}
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  let a$1 = true;
  $(a$1);
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
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
