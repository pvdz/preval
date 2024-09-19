# Preval test case

# empty.md

> Normalize > Pattern > Param > Rest > Empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f(...x) {
  return x;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0) {
  let x = $$0;
  debugger;
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function (...$$0) {
  let x = $$0;
  debugger;
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:array*/ = [];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
