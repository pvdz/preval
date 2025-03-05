# Preval test case

# base_binary_compare3.md

> Function bool ret > Base binary compare3
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return $ === $; // Doesn't matter what $ is, the function will return true or false.
  } else {
    return false;
  }
}
// These inverts can be dropped by inverting all return values of `f`
$(!f(), 'one');
$(!f(), 'two');
$(!f(), 'three');
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    return $ === $;
  } else {
    return false;
  }
};
$(!f(), `one`);
$(!f(), `two`);
$(!f(), `three`);
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
const tmpUnaryArg = f();
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 = f();
const tmpCalleeParam$1 = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 = f();
const tmpCalleeParam$3 = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:boolean*/ = Boolean($);
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 /*:boolean*/ = Boolean($);
const tmpCalleeParam$1 /*:boolean*/ = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 /*:boolean*/ = Boolean($);
const tmpCalleeParam$3 /*:boolean*/ = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Boolean( $ );
const b = !a;
$( b, "one" );
const c = Boolean( $ );
const d = !c;
$( d, "two" );
const e = Boolean( $ );
const f = !e;
$( f, "three" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'one'
 - 2: false, 'two'
 - 3: false, 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
