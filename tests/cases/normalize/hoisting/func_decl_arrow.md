# Preval test case

# func_decl_arrow.md

> Normalize > Hoisting > Func decl arrow
>
> Function declaration in toplevel

## Input

`````js filename=intro
const g = () => {
  $(1);
  function f() {}
  $(f());
}
g();
`````

## Pre Normal


`````js filename=intro
const g = () => {
  debugger;
  let f$3 = function () {
    debugger;
  };
  $(1);
  $(f$3());
};
g();
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  let f$3 = function () {
    debugger;
    return undefined;
  };
  $(1);
  const tmpCalleeParam = f$3();
  $(tmpCalleeParam);
  return undefined;
};
g();
`````

## Output


`````js filename=intro
$(1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
