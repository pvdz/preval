# Preval test case

# writing_func_expr_name3.md

> Function > Writing func expr name3
>
> Writing to a func expr name is ... tricky?

## Input

`````js filename=intro
function g() {
  "use strict";
  module.exports = function f() {
    return (f = function() {
    })();
  };
}
$(g);
g();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const g /*:()=>unknown*/ = function () {
  debugger;
  module.exports = f;
  return undefined;
};
$(g);
module.exports = f;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function $pcompiled() {};
$(function () {
  module.exports = f;
});
module.exports = f;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled() {
  debugger;
  return undefined;
};
const b = function() {
  debugger;
  module.exports = a;
  return undefined;
};
$( b );
module.exports = a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
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
  return undefined;
};
$(g);
g();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
