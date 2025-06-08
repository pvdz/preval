# Preval test case

# alias_side_effect.md

> If test aliased > Alias side effect
>
> let alias is initialized with a side effect, should NOT replace $(a)

## Input

`````js filename=intro
const c = $(true);
let a = !$();
if (c) {
  $(a); // expect: $(a)
}
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const tmpUnaryArg /*:unknown*/ = $();
if (c) {
  const a /*:boolean*/ /*banged*/ = !tmpUnaryArg;
  $(a);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(true);
const tmpUnaryArg = $();
if (c) {
  $(!tmpUnaryArg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $();
if (a) {
  const c = !b;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
const tmpUnaryArg = $();
let a = !tmpUnaryArg;
if (c) {
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
 - 2: 
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
