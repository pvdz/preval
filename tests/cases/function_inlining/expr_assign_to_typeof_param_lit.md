# Preval test case

# expr_assign_to_typeof_param_lit.md

> Function inlining > Expr assign to typeof param lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

## Input

`````js filename=intro
function f() {
  function g(a) {
    a = typeof 10;
  }
  g();
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let a = $$0;
    debugger;
    a = typeof 10;
  };
  g();
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0) {
    let a = $$0;
    debugger;
    a = `number`;
    return undefined;
  };
  g();
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
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
