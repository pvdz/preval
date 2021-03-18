# Preval test case

# expr_assign_to_closure_param.md

> Function inlining > Expr assign to closure param
>
> A function that does a simple thing may need to be inlined in trivial cases.

The parameter must be mapped to the arg when inlining g.

#TODO

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g(x) {
    a = x;
  }
  g(10);
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function (x) {
    a = x;
  };
  let a = 20;
  g(10);
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function (x) {
    a = x;
  };
  let a = 20;
  g(10);
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same