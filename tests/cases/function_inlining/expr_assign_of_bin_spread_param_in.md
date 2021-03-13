# Preval test case

# expr_assign_of_bin_spread_param_in.md

> Function inlining > Expr assign of bin spread param in
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b, c, d, e) {
    x = a + d;
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
    x = a + d;
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
    x = a + d;
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
  const g = function (a, b, c, d, e) {
    x = a + d;
  };
  const tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(10, 20, ...arr, 30, 40, 50, 60);
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
 - 2: 12
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
