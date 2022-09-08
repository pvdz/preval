# Preval test case

# base_binary_compare2.md

> Function bool ret > Base binary compare2
>
> A function that is guaranteed to return bools may be eligible for inverting

#TODO

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
const tmpCallCallee = $;
const tmpUnaryArg = f();
const tmpCalleeParam = !tmpUnaryArg;
const tmpCalleeParam$1 = `one`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $;
const tmpUnaryArg$1 = f();
const tmpCalleeParam$3 = !tmpUnaryArg$1;
const tmpCalleeParam$5 = `two`;
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCallCallee$3 = $;
const tmpUnaryArg$3 = f();
const tmpCalleeParam$7 = !tmpUnaryArg$3;
const tmpCalleeParam$9 = `three`;
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
`````

## Output

`````js filename=intro
const f = function () {
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
const tmpCalleeParam$3 = !tmpUnaryArg$1;
$(tmpCalleeParam$3, `two`);
const tmpUnaryArg$3 = f();
const tmpCalleeParam$7 = !tmpUnaryArg$3;
$(tmpCalleeParam$7, `three`);
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
