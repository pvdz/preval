# Preval test case

# base_boolean.md

> If test bool > Base boolean
>
> A constant that is tested in an `if` must hold when inverted

#TODO

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
const f = function ($$0) {
  const x = $$0;
  debugger;
  if (x) {
    $(`a`, true);
    return undefined;
  } else {
    $(`b`, false);
    return undefined;
  }
};
const tmpCalleeParam$7 = $(1);
f(tmpCalleeParam$7);
const tmpCalleeParam$9 = $(0);
f(tmpCalleeParam$9);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  if (b) {
    $( "a", true );
    return undefined;
  }
  else {
    $( "b", false );
    return undefined;
  }
};
const d = $( 1 );
a( d );
const e = $( 0 );
a( e );
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
