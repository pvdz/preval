# Preval test case

# expr_assign_of_bin_param_lit.md

> Function inlining > Expr assign of bin param lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

#TODO

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = a + 100;
  }
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function (a, b) {
    x = a + 100;
  };
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function (a, b) {
    x = a + 100;
  };
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Output

`````js filename=intro
$(110);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 110
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same