# Preval test case

# return_infinity.md

> Function > Return infinity
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return Infinity;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return Infinity;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
