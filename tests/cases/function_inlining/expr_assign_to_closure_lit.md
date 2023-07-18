# Preval test case

# expr_assign_to_closure_lit.md

> Function inlining > Expr assign to closure lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

#TODO

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g() {
    a = 10;
  }
  g();
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    a = 10;
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
  debugger;
  let g = function () {
    debugger;
    a = 10;
    return undefined;
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
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
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
