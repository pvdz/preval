# Preval test case

# undefined_explicit_plus_one.md

> Normalize > Return > Undefined explicit plus one
>
> Implicitly returning undefined as the last statement is not necessary

## Input

`````js filename=intro
function f() {
  $(1);
  return undefined;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
