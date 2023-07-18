# Preval test case

# pop.md

> Array > Manipulation > Pop > Pop
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const n = ARR.pop();
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
const n = ARR.pop();
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
const n = ARR.pop();
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````

## Output

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(`c`);
$(NOOP);
$(ARR);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c",, ];
const b = function() {
  debugger;
  $( a );
  return undefined;
},;
$( "c" );
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: '<function>'
 - 3: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
