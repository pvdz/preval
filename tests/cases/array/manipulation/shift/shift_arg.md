# Preval test case

# shift_arg.md

> Array > Manipulation > Shift > Shift arg
>
> Remove elemenet from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Pre Normal


`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Normalized


`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const n = ARR.shift($);
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Output


`````js filename=intro
const ARR /*:array*/ = [`b`, `c`, `a`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`a`);
$(NOOP);
$(ARR);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "b", "c", "a" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( "a" );
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: '<function>'
 - 3: ['b', 'c', 'a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
