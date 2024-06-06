# Preval test case

# let_bad.md

> If test bool > Let bad
>
> A constant that is tested in an `if` must hold when inverted

Dont apply the trick in this case because the test is mutable.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) x = 10;
  if (x) {
    $('a', !x);
  } else {
    $('b', !x);
  }
}
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) x = 10;
  if (x) {
    $(`a`, !x);
  } else {
    $(`b`, !x);
  }
};
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = 10;
  } else {
  }
  if (x) {
    const tmpCallCallee = $;
    const tmpCalleeParam = `a`;
    const tmpCalleeParam$1 = !x;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    return undefined;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = `b`;
    const tmpCalleeParam$5 = !x;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
    return undefined;
  }
};
f();
f();
f();
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  let x = $(1);
  let tmpCalleeParam$1 = false;
  if ($) {
    x = 10;
  } else {
    tmpCalleeParam$1 = !x;
  }
  if (x) {
    $(`a`, tmpCalleeParam$1);
    return undefined;
  } else {
    $(`b`, tmpCalleeParam$1);
    return undefined;
  }
};
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = $( 1 );
  let c = false;
  if ($) {
    b = 10;
  }
  else {
    c = !b;
  }
  if (b) {
    $( "a", c );
    return undefined;
  }
  else {
    $( "b", c );
    return undefined;
  }
};
a();
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a', false
 - 3: 1
 - 4: 'a', false
 - 5: 1
 - 6: 'a', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
