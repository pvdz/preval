# Preval test case

# let.md

> Recursive funcs > Let
>
>

## Input

`````js filename=intro
let f = function() {
  $(f());
}
f = function() {
  $(f());
}
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
  return undefined;
};
f = function () {
  debugger;
  let tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
  return undefined;
};
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
