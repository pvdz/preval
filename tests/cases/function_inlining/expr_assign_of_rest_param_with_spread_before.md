# Preval test case

# expr_assign_of_rest_param_with_spread_before.md

> Function inlining > Expr assign of rest param with spread before
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread before the rest index so we can't do anything.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = b;
  }
  const arr = $([1, 2])
  g(...arr, 10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1 /*:array*/) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = b;
  };
  const arr = $([1, 2]);
  g(...arr, 10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1 /*:array*/) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = b;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(...arr, 10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = 0;
const g /*:(unused, array)=>undefined*/ = function ($$0, ...$$1 /*:array*/) {
  const b /*:array*/ = $$1;
  debugger;
  x = b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(...arr, 10, 20, 30, 40, 50, 60);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  const c = $$1;
  debugger;
  a = c;
  return undefined;
};
const d = [ 1, 2 ];
const e = $( d );
b( ...e, 10, 20, 30, 40, 50, 60 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: [2, 10, 20, 30, 40, 50, 60]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
