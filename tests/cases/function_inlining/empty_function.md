# Preval test case

# empty_function.md

> Function inlining > Empty function
>
> A function that's empty should have all its calls inlined to `undefined`

## Input

`````js filename=intro
function f() {}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
