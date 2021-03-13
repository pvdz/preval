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
  let g = function (a, b) {
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
  let g = function (a, b) {
    x = b;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2, 3];
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
  const g = function (a, b) {
    x = b;
  };
  const tmpCalleeParam = [1, 2, 3];
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
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
