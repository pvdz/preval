# Preval test case

# base.md

> Recursive funcs > Base
>
>

## Input

`````js filename=intro
function f() {
  $(f());
}
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  f();
  $(undefined);
  return undefined;
};
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  f();
  $(undefined);
};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  a();
  $( undefined );
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
