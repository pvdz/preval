# Preval test case

# odd_early_return3b.md

> Normalize > Switch > Odd early return3b
>
> Sorting out the branching stuff

Regression was not inlining a single used function

This function is in global.

## Input

`````js filename=intro
const inlineMe = function () {
  $ <= 3;
};
const g = function () {
  if ($) {
    inlineMe();
  }
};
if ($) {
  g();
}
`````

## Pre Normal


`````js filename=intro
const inlineMe = function () {
  debugger;
  $ <= 3;
};
const g = function () {
  debugger;
  if ($) {
    inlineMe();
  }
};
if ($) {
  g();
}
`````

## Normalized


`````js filename=intro
const inlineMe = function () {
  debugger;
  $ <= 0;
  return undefined;
};
const g = function () {
  debugger;
  if ($) {
    inlineMe();
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  g();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  $ ** 0;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $ ** 0;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
