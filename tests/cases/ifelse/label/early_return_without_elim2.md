# Preval test case

# early_return_without_elim2.md

> Ifelse > Label > Early return without elim2
>
> Early return in labeled if-else such that it won't just be eliminated through DCE

Regression; The function was inlined into global but the return statement was not scrubbed.

#TODO

## Input

`````js filename=intro
let f = function () {
  const g = function () {
    if ($) {
      return undefined;
    } else {
      return undefined;
    }
  };
  $('inside');
  const t = g();
  return t;
};
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const g = function () {
    debugger;
    if ($) {
      return undefined;
    } else {
      return undefined;
    }
  };
  $(`inside`);
  const t = g();
  return t;
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const g = function () {
    debugger;
    return undefined;
  };
  $(`inside`);
  const t = g();
  return t;
};
f();
`````

## Output


`````js filename=intro
$(`inside`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "inside" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inside'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
