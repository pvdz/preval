# Preval test case

# recursion_indirect2.md

> One timers > Recursion indirect2
>
> This was triggering a problem in another test. Turns out to be caused by recursion.

The single call was being inlined but that led to an implosion of the function.

#TODO

## Input

`````js filename=intro
const f = function () {
  const repeat = function () {
    f();
  };
  
  repeat();
};
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const repeat = function () {
    debugger;
    f();
  };
  repeat();
};
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const repeat = function () {
    debugger;
    f();
    return undefined;
  };
  repeat();
  return undefined;
};
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
