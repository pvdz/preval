# Preval test case

# alias_closure.md

> If test aliased > Alias closure
>
> let alias is captured by a closure, should NOT replace $(a)

## Input

`````js filename=intro
let a = !c;
function foo() {
  if (c) {
    $(a); // expect: $(a)
  }
}
`````


## Settled


`````js filename=intro
c;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
c;
`````


## PST Settled
With rename=true

`````js filename=intro
c;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function () {
  debugger;
  if (c) {
    $(a);
    return undefined;
  } else {
    return undefined;
  }
};
let a = !c;
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
