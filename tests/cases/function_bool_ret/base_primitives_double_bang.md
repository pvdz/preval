# Preval test case

# base_primitives_double_bang.md

> Function bool ret > Base primitives double bang
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return true;
  } else {
    return false;
  }
}
// These inverts can be dropped by inverting all return values of f
$(!!f(), 'one');
$(!!f(), 'two');
$(!!f(), 'three');
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return true;
  } else {
    return false;
  }
};
$(!!f(), `one`);
$(!!f(), `two`);
$(!!f(), `three`);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return true;
  } else {
    return false;
  }
};
const tmpUnaryArg$1 = f();
const tmpUnaryArg = !tmpUnaryArg$1;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$5 = f();
const tmpUnaryArg$3 = !tmpUnaryArg$5;
const tmpCalleeParam$1 = !tmpUnaryArg$3;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$9 = f();
const tmpUnaryArg$7 = !tmpUnaryArg$9;
const tmpCalleeParam$3 = !tmpUnaryArg$7;
$(tmpCalleeParam$3, `three`);
`````

## Output


`````js filename=intro
const tmpUnaryArg$1 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$1, `one`);
const tmpUnaryArg$5 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$5, `two`);
const tmpUnaryArg$9 /*:boolean*/ = Boolean($);
$(tmpUnaryArg$9, `three`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Boolean( $ );
$( a, "one" );
const b = Boolean( $ );
$( b, "two" );
const c = Boolean( $ );
$( c, "three" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'one'
 - 2: true, 'two'
 - 3: true, 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
