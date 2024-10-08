# Preval test case

# expr_assign_of_typeof_param_with_spread_before2.md

> Function inlining > Expr assign of typeof param with spread before2
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread before the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = typeof b;
  }
  const arr = $(['uh', 'oh', 'no']);
  g(...arr, 10, 20, 30, 40, 50, 60);
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
    x = typeof b;
  };
  const arr = $([`uh`, `oh`, `no`]);
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
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = typeof b;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [`uh`, `oh`, `no`];
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
let x = 0;
const g /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const b = $$1;
  debugger;
  x = typeof b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [`uh`, `oh`, `no`];
const arr = $(tmpCalleeParam);
g(...arr, 10, 20);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  const c = d;
  debugger;
  a = typeof c;
  return undefined;
};
const e = [ "uh", "oh", "no" ];
const f = $( e );
b( ...f, 10, 20 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['uh', 'oh', 'no']
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
