# Preval test case

# base_boolean.md

> If test bool > Base boolean
>
> A constant that is tested in an `if` must hold when inverted

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('a', Boolean(x));
  } else {
    $('b', Boolean(x));
  }
}
f($(1));
f($(0));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    $(`a`, Boolean(x));
  } else {
    $(`b`, Boolean(x));
  }
};
f($(1));
f($(0));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  if (x) {
    const tmpCallCallee = $;
    const tmpCalleeParam = `a`;
    const tmpCalleeParam$1 = Boolean(x);
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    return undefined;
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$3 = `b`;
    const tmpCalleeParam$5 = Boolean(x);
    tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
    return undefined;
  }
};
const tmpCallCallee$3 = f;
const tmpCalleeParam$7 = $(1);
tmpCallCallee$3(tmpCalleeParam$7);
const tmpCallCallee$5 = f;
const tmpCalleeParam$9 = $(0);
tmpCallCallee$5(tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const tmpCalleeParam$7 = $(1);
if (tmpCalleeParam$7) {
  $(`a`, true);
} else {
  $(`b`, false);
}
const tmpCalleeParam$9 = $(0);
if (tmpCalleeParam$9) {
  $(`a`, true);
} else {
  $(`b`, false);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a", true );
}
else {
  $( "b", false );
}
const b = $( 0 );
if (b) {
  $( "a", true );
}
else {
  $( "b", false );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a', true
 - 3: 0
 - 4: 'b', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
