# Preval test case

# alias_shadowing.md

> If test aliased > Alias shadowing
>
> shadowing: inner block declares new let a, should NOT replace $(a) in inner block

## Input

`````js filename=intro
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
if (c) {
  let a$1 = true;
  $(a$1);
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
