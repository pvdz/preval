# Preval test case

# closure_is_param.md

> Static arg ops > Assignment > Closure is param

## Input

`````js filename=intro
if ($) {
  let x = 1;
  const f = function(a) {
    x = a;
    $(x, a);
  };

  f(11);
  f(12);
  $(x);
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
    x = a;
    $(x, a);
  };
  f(11);
  f(12);
  $(x);
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
    x = a;
    $(x, a);
    return undefined;
  };
  f(11);
  f(12);
  $(x);
} else {
}
$(`!`);
`````

## Output


`````js filename=intro
if ($) {
  $(11, 11);
  $(12, 12);
  $(12);
} else {
}
$(`!`);
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 11, 11 );
  $( 12, 12 );
  $( 12 );
}
$( "!" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 11, 11
 - 2: 12, 12
 - 3: 12
 - 4: '!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
