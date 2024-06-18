# Preval test case

# base_exl.md

> If test bool > Base exl
>
> A constant that is tested in an `if` must hold when inverted

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('a', !x);
  } else {
    $('b', !x);
  }
}
f($(0));
f($(1));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    $(`a`, !x);
  } else {
    $(`b`, !x);
  }
};
f($(0));
f($(1));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
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
const tmpCallCallee$3 = f;
const tmpCalleeParam$7 = $(0);
tmpCallCallee$3(tmpCalleeParam$7);
const tmpCallCallee$5 = f;
const tmpCalleeParam$9 = $(1);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const tmpCalleeParam$7 = $(0);
if (tmpCalleeParam$7) {
  $(`a`, false);
} else {
  $(`b`, true);
}
const tmpCalleeParam$9 = $(1);
if (tmpCalleeParam$9) {
  $(`a`, false);
} else {
  $(`b`, true);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "a", false );
}
else {
  $( "b", true );
}
const b = $( 1 );
if (b) {
  $( "a", false );
}
else {
  $( "b", true );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'b', true
 - 3: 1
 - 4: 'a', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
