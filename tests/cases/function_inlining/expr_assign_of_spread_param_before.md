# Preval test case

# expr_assign_of_spread_param_before.md

> Function inlining > Expr assign of spread param before
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread.

The param that was used in the assignment was not covered by the spread so we can fold it after all.

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b, c, d, e) {
    x = b;
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
  let g = function (a, b, c, d, e) {
    x = b;
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
  let g = function (a, b, c, d, e) {
    x = b;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arr = tmpCallCallee(tmpCalleeParam);
  g(10, 20, ...arr, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = [1, 2];
  $(tmpCalleeParam);
  x = 20;
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
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
