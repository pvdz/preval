# Preval test case

# simple_func_into_var_decl_yield.md

> Function inlining > Simple func into var decl yield
>
> Attempt to create a case where a simple function is folded while the call is into a var decl.

Make sure `yield` doesn't blow up.

## Input

`````js filename=intro
let a = 10;
function * f() {
  a = yield 20;
}
const p = f();
const q = f();
$(p, q);
`````

## Settled


`````js filename=intro
const f /*:()=>object*/ = function* () {
  debugger;
  yield 20;
  return undefined;
};
const p /*:object*/ = f();
const q /*:object*/ = f();
$(p, q);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function* () {
  yield 20;
};
$(f(), f());
`````

## Pre Normal


`````js filename=intro
let f = function* () {
  debugger;
  a = yield 20;
};
let a = 10;
const p = f();
const q = f();
$(p, q);
`````

## Normalized


`````js filename=intro
let f = function* () {
  debugger;
  a = yield 20;
  return undefined;
};
let a = 10;
const p = f();
const q = f();
$(p, q);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function *() {
  debugger;
  yield ( 20 );
  return undefined;
};
const b = a();
const c = a();
$( b, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- would this not be the same as await? would we not want to infer the arg here?
- inline generator functions safely (because yield)