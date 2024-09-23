# Preval test case

# let_works.md

> If test bool > Let works
>
> A constant that is tested in an `if` must hold when inverted

Could apply the trick in this case because the mutation happens later. But it's more expensive.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    $('a', !x);
  } else {
    $('b', !x);
  }
  if ($) x = 10;
$(x);
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
  if (x) {
    $(`a`, !x);
  } else {
    $(`b`, !x);
  }
  if ($) x = 10;
  $(x);
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
  if (x) {
    const tmpCallCallee = $;
    const tmpCalleeParam = `a`;
    const tmpCalleeParam$1 = !x;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = `b`;
    const tmpCalleeParam$5 = !x;
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
  }
  if ($) {
    x = 10;
  } else {
  }
  $(x);
  return undefined;
};
f();
f();
f();
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  const x = $(1);
  if (x) {
    $(`a`, false);
  } else {
    $(`b`, true);
  }
  if ($) {
    $(10);
    return undefined;
  } else {
    $(x);
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
  const b = $( 1 );
  if (b) {
    $( "a", false );
  }
  else {
    $( "b", true );
  }
  if ($) {
    $( 10 );
    return undefined;
  }
  else {
    $( b );
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
 - 3: 10
 - 4: 1
 - 5: 'a', false
 - 6: 10
 - 7: 1
 - 8: 'a', false
 - 9: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
