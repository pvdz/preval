# Preval test case

# alias_non_inverted.md

> If test aliased > Alias non inverted
>
> let alias is not an inversion, should NOT replace $(a)

## Input

`````js filename=intro
let a = c;
if (c) {
  $(a); // expect: $(a)
}
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = c;
if (c) {
  $(a);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = c;
if (c) {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = c;
if (c) {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = c;
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
