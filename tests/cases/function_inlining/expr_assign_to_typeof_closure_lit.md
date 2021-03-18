# Preval test case

# expr_assign_to_typeof_closure_lit.md

> Function inlining > Expr assign to typeof closure lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

#TODO

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g() {
    a = typeof 10;
  }
  g();
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    a = typeof 10;
  };
  let a = 20;
  g();
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    a = 'number';
  };
  let a = 20;
  g();
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('number');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same