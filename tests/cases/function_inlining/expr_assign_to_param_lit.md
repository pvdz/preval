# Preval test case

# expr_assign_to_param_lit.md

> Function inlining > Expr assign to param lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

#TODO

## Input

`````js filename=intro
function f() {
  function g(a) {
    a = 10;
  }
  g();
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function (a) {
    a = 10;
  };
  g();
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function (a) {
    a = 10;
  };
  g();
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same