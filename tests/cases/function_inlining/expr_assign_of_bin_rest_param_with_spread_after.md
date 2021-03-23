# Preval test case

# expr_assign_of_bin_rest_param_with_spread_after.md

> Function inlining > Expr assign of bin rest param with spread after
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread after the rest param index so we should transform.

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = a + b;
  }
  const arr = $([1, 2])
  g(10, 20, 30, 40, ...arr, 50, 60);
}
f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a + b;
  };
  const arr = $([1, 2]);
  g(10, 20, 30, 40, ...arr, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a + b;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(10, 20, 30, 40, ...arr, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1, 2];
const arr = $(tmpCalleeParam);
const tmpBinBothRhs = [20, 30, 40, ...arr, 50, 60];
const SSA_x = 10 + tmpBinBothRhs;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: '1020,30,40,1,2,50,60'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
