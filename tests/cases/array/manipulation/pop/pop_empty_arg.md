# Preval test case

# pop_empty_arg.md

> Array > Manipulation > Pop > Pop empty arg
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [];
const NOOP = function() {
$(ARR);
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Pre Normal

`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized

`````js filename=intro
const ARR = [];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.pop($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Output

`````js filename=intro
const ARR = [undefined];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(undefined);
$(NOOP);
$(ARR);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ undefined ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( undefined );
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: '<function>'
 - 3: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
