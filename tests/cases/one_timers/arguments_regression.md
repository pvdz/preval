# Preval test case

# arguments_regression.md

> One timers > Arguments regression
>
> x

## Input

`````js filename=intro
let bool = true;
const f = function () {
  const tmpArgs = arguments; // Code would crash because this got reduced to a statement expression of `arguments` which broke a function header invariant in `inline_constants.mjs`
  if (bool) {
    unknown();
    bool = false;
  }
};
f();
`````

## Pre Normal


`````js filename=intro
let bool = true;
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpArgs = tmpPrevalAliasArgumentsAny;
  if (bool) {
    unknown();
    bool = false;
  }
};
f();
`````

## Normalized


`````js filename=intro
let bool = true;
const f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpArgs = tmpPrevalAliasArgumentsAny;
  if (bool) {
    unknown();
    bool = false;
    return undefined;
  } else {
    return undefined;
  }
};
f();
`````

## Output


`````js filename=intro
unknown();
`````

## PST Output

With rename=true

`````js filename=intro
unknown();
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
