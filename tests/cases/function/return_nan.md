# Preval test case

# return_nan.md

> Function > Return nan
>
> A function that returns NaN

## Input

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
