# Preval test case

# push_num_num.md

> Array > Manipulation > Push > Push num num
>
> Array literal with push and a const function binding in between
> The push should inline the args and eliminate the call

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push(10, 20);
$(count);
ARR.push(count);
$(NOOP);
`````

## Pre Normal

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
};
const count = ARR.push(10, 20);
$(count);
ARR.push(count);
$(NOOP);
`````

## Normalized

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
const count = ARR.push(10, 20);
$(count);
ARR.push(count);
$(NOOP);
`````

## Output

`````js filename=intro
const ARR = [`a`, `b`, `c`, 10, 20, 5];
const NOOP = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(5);
$(NOOP);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "a", "b", "c", 10, 20, 5,, ];
const b = function() {
  debugger;
  $( a );
  return undefined;
},;
$( 5 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
