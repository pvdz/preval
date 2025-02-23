# Preval test case

# expr_assign_of_typeof_spread_param_in.md

> Function inlining > Expr assign of typeof spread param in
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b, c, d, e) {
    x = typeof d;
  }
  const arr = $([1, 2])
  g(10, 20, ...arr, 30, 40, 50, 60);
}
f();
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1, $$2, $$3, $$4) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    let d = $$3;
    let e = $$4;
    debugger;
    x = typeof d;
  };
  const arr = $([1, 2]);
  g(10, 20, ...arr, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1, $$2, $$3, $$4) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    let d = $$3;
    let e = $$4;
    debugger;
    x = typeof d;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(10, 20, ...arr, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````

## Output


`````js filename=intro
let x /*:primitive*/ = 0;
const g /*:(unused, unused, unused, unknown, unused)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const d = $$3;
  debugger;
  x = typeof d;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
const arr = $(tmpCalleeParam);
g(10, 20, ...arr, 30, 40, 50);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1,$$2,$$3,$$4 ) {
  const c = $$3;
  debugger;
  a = typeof c;
  return undefined;
};
const d = [ 1, 2 ];
const e = $( d );
b( 10, 20, ...e, 30, 40, 50 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
