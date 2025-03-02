# Preval test case

# regression.md

> Function > Constructor > Regression
>
> The Function() inlining would fail because the pid counter would start at 1, leading to duplicate pids.
> The normalization would need to not reset the pid counter when normalization during cloning

## Input

`````js filename=intro
// This test triggered the regression at the time of writing.
const f = Function(`return (function() {}.constructor("return this")( ));`);
$(f);
`````

## Pre Normal


`````js filename=intro
const f = Function(`return (function() {}.constructor("return this")( ));`);
$(f);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const tmpCallObj = function () {
    debugger;
    return undefined;
  };
  const tmpCallComplexCallee = tmpCallObj.constructor(`return this`);
  const tmpReturnArg = tmpCallComplexCallee();
  return tmpReturnArg;
};
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return window;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return window;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
