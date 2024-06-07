# Preval test case

# regression.md

> Let hoisting > Regression
>
> This was a regression because when the decl was hoisted it would be init
> to undefined, but it should have been init to the same value as the first
> decl (1).

## Input

`````js filename=intro
if ($) {
  let x = 1;
  const f = function(a) {
    if (a) {
      x = a;
      $(x, a);
    } else {
      $('b', x, a);
    }
  };

  f(0);
  f(1);
}
$('!');
`````

## Pre Normal


`````js filename=intro
if ($) {
  let x = 1;
  const f = function ($$0) {
    let a = $$0;
    debugger;
    if (a) {
      x = a;
      $(x, a);
    } else {
      $(`b`, x, a);
    }
  };
  f(0);
  f(1);
}
$(`!`);
`````

## Normalized


`````js filename=intro
if ($) {
  let x = 1;
  const f = function ($$0) {
    let a = $$0;
    debugger;
    if (a) {
      x = a;
      $(x, a);
      return undefined;
    } else {
      $(`b`, x, a);
      return undefined;
    }
  };
  f(0);
  f(1);
} else {
}
$(`!`);
`````

## Output


`````js filename=intro
if ($) {
  const f = function ($$0) {
    const a = $$0;
    debugger;
    if (a) {
      $(a, a);
      return undefined;
    } else {
      $(`b`, 1, a);
      return undefined;
    }
  };
  f(0);
  f(1);
} else {
}
$(`!`);
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = function($$0 ) {
    const b = c;
    debugger;
    if (b) {
      $( b, b );
      return undefined;
    }
    else {
      $( "b", 1, b );
      return undefined;
    }
  };
  a( 0 );
  a( 1 );
}
$( "!" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b', 1, 0
 - 2: 1, 1
 - 3: '!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
