# Preval test case

# writing_func_expr_name.md

> Function > Writing func expr name
>
> Writing to a func expr name is ... tricky?

## Input

`````js filename=intro
module.exports = function f() {
  var e = ['a', 'b', 'c'];
  return (f = function() {
    return e;
  })();
};
`````


## Settled


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  const e /*:array*/ /*truthy*/ = [`a`, `b`, `c`];
  f = function () {
    debugger;
    return e;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
const tmpAssignMemRhs /*:function*/ /*truthy*/ = f;
module.exports = tmpAssignMemRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function () {
  const e = [`a`, `b`, `c`];
  f = function () {
    return e;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
module.exports = f;
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ "a", "b", "c" ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
module.exports = d;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignMemLhsObj = module;
let f = function () {
  debugger;
  let e = undefined;
  e = [`a`, `b`, `c`];
  f = function () {
    debugger;
    return e;
  };
  const tmpCallComplexCallee = f;
  const tmpReturnArg = f();
  return tmpReturnArg;
};
const tmpAssignMemRhs = f;
tmpAssignMemLhsObj.exports = tmpAssignMemRhs;
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
