# Preval test case

# expr_assign_of_rest_param_with_spread_before.md

> Function inlining > Expr assign of rest param with spread before
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread before the rest index so we can't do anything.

#TODO

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
  let g = function (a, ...b) {
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
  let g = function (a, ...b) {
    x = b;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(...arr, 10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  const g = function (a, ...b) {
    x = b;
  };
  const tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(...arr, 10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
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
