# Preval test case

# alias_side_effect.md

> If test aliased > Alias side effect
>
> let alias is initialized with a side effect, should NOT replace $(a)

## Input

`````js filename=intro
let a = !foo();
if (c) {
  $(a); // expect: $(a)
}
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = foo();
if (c) {
  const a /*:boolean*/ = !tmpUnaryArg;
  $(a);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = foo();
if (c) {
  $(!tmpUnaryArg);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = foo();
if (c) {
  const b = !a;
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = foo();
let a = !tmpUnaryArg;
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

foo, c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
