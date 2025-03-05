# Preval test case

# return_var_param.md

> Function inlining > Return var param
>
> A function that is a variable decl with simple init and a return of this value should be inlined

The constant should be eliminated anyways but that's a different matter.

## Input

`````js filename=intro
function f(a) {
  const x = a;
  return x;
}
$(f(1));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  const x = a;
  return x;
};
$(f(1));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return a;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
