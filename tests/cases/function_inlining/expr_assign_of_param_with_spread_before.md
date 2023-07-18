# Preval test case

# expr_assign_of_param_with_spread_before.md

> Function inlining > Expr assign of param with spread before
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread before the param index so we must bail.

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = b;
  }
  const arr = $([1, 2, 3]);
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
    x = b;
  };
  const arr = $([1, 2, 3]);
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
    x = b;
    return undefined;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2, 3];
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
const g = function ($$0, $$1) {
  const b = $$1;
  debugger;
  x = b;
  return undefined;
};
const tmpCalleeParam = [1, 2, 3];
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
  a = c;
  return undefined;
},;
const e = [ 1, 2, 3,, ];
const f = $( e );
b( ... f, 10, 20 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
