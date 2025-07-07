# Preval test case

# writing_func_expr_name2.md

> Function > Writing func expr name2
>
> Writing to a func expr name is ... tricky?

## Input

`````js filename=intro
module.exports = function f() {
  return (f = function() {
  })();
};
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
module.exports = f;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
module.exports = function $pcompiled() {};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
module.exports = a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignMemLhsObj = module;
let f = function () {
  debugger;
  f = function () {
    debugger;
    return undefined;
  };
  const tmpCallComplexCallee = f;
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const tmpAssignMemRhs = f;
tmpAssignMemLhsObj.exports = tmpAssignMemRhs;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
