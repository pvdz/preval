# Preval test case

# base_binary_compare2.md

> Function bool ret > Base binary compare2
>
> A function that is guaranteed to return bools may be eligible for inverting

## Input

`````js filename=intro
function f() {
  if ($) {
    return 'a' === $; // Doesn't matter what $ is, the function will return true or false.
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
    return `a` === $;
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
    const tmpReturnArg = `a` === $;
    return tmpReturnArg;
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
const f /*:()=>boolean*/ = function () {
  debugger;
  if ($) {
    const tmpReturnArg /*:boolean*/ = `a` === $;
    return tmpReturnArg;
  } else {
    return false;
  }
};
const tmpUnaryArg /*:boolean*/ = f();
const tmpCalleeParam /*:boolean*/ = !tmpUnaryArg;
$(tmpCalleeParam, `one`);
const tmpUnaryArg$1 /*:boolean*/ = f();
const tmpCalleeParam$1 /*:boolean*/ = !tmpUnaryArg$1;
$(tmpCalleeParam$1, `two`);
const tmpUnaryArg$3 /*:boolean*/ = f();
const tmpCalleeParam$3 /*:boolean*/ = !tmpUnaryArg$3;
$(tmpCalleeParam$3, `three`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    const b = "a" === $;
    return b;
  }
  else {
    return false;
  }
};
const c = a();
const d = !c;
$( d, "one" );
const e = a();
const f = !e;
$( f, "two" );
const g = a();
const h = !g;
$( h, "three" );
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
