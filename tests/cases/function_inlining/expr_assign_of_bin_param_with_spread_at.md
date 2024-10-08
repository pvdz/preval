# Preval test case

# expr_assign_of_bin_param_with_spread_at.md

> Function inlining > Expr assign of bin param with spread at
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread at the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = a * b;
  }
  const arr = $([1, 2, 3]);
  g(10, ...arr, 20, 30, 40, 50, 60);
}
f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a * b;
  };
  const arr = $([1, 2, 3]);
  g(10, ...arr, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a * b;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2, 3];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(10, ...arr, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````

## Output


`````js filename=intro
let x /*:number*/ = 0;
const g /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const a = $$0;
  const b = $$1;
  debugger;
  x = a * b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const arr = $(tmpCalleeParam);
g(10, ...arr, 20);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  a = c * e;
  return undefined;
};
const g = [ 1, 2, 3 ];
const h = $( g );
b( 10, ...h, 20 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
