# Preval test case

# primitive_to_closure.md

> Static arg ops > Assignment > Primitive to closure

## Input

`````js filename=intro
if ($) {
  let x = 1;
  const f = function(a) {
    x = 100;
    $(x, a);
  };

  f(11);
  f(12);
  $(x);
}
$('!');
`````

## Settled


`````js filename=intro
if ($) {
  $(100, 11);
  $(100, 12);
  $(100);
} else {
}
$(`!`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(100, 11);
  $(100, 12);
  $(100);
}
$(`!`);
`````

## Pre Normal


`````js filename=intro
if ($) {
  let x = 1;
  const f = function ($$0) {
    let a = $$0;
    debugger;
    x = 100;
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
    x = 100;
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

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 100, 11 );
  $( 100, 12 );
  $( 100 );
}
$( "!" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100, 11
 - 2: 100, 12
 - 3: 100
 - 4: '!'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
