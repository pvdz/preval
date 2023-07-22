# Preval test case

# base_exl.md

> If test bool > Base exl
>
> A constant that is tested in an `if` must hold when inverted

#TODO

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
const f = function ($$0) {
  const x = $$0;
  debugger;
  if (x) {
    $(`a`, false);
    return undefined;
  } else {
    $(`b`, true);
    return undefined;
  }
};
const tmpCalleeParam$7 = $(0);
f(tmpCalleeParam$7);
const tmpCalleeParam$9 = $(1);
f(tmpCalleeParam$9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  if (b) {
    $( "a", false );
    return undefined;
  }
  else {
    $( "b", true );
    return undefined;
  }
};
const d = $( 0 );
a( d );
const e = $( 1 );
a( e );
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
