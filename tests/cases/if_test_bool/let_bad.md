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
    const tmpCalleeParam = !x;
    $(`a`, tmpCalleeParam);
    return undefined;
  } else {
    const tmpCalleeParam$1 = !x;
    $(`b`, tmpCalleeParam$1);
    return undefined;
  }
};
f();
f();
f();
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  let x /*:unknown*/ = $(1);
  let tmpCalleeParam /*:boolean*/ = false;
  if ($) {
    x = 10;
  } else {
    tmpCalleeParam = !x;
  }
  if (x) {
    $(`a`, tmpCalleeParam);
    return undefined;
  } else {
    $(`b`, tmpCalleeParam);
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
