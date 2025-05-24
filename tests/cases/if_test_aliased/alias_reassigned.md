# Preval test case

# alias_reassigned.md

> If test aliased > Alias reassigned
>
> let alias is reassigned before the if, should NOT replace $(a)

## Input

`````js filename=intro
let a = !c;
a = true;
if (c) {
  $(a); // expect: $(a)
}
`````


## Settled


`````js filename=intro
if (c) {
  $(true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
a = true;
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
