# Preval test case

# complex_console.md

> Let hoisting > Complex console
>
> Hoisting a let even if it has a complex rhs

## Input

`````js filename=intro
let danger = function () {
  if ($) {
    danger = null;
    return 1;
  }
};
const f = console.log('ok');
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  $(f);
  x = $('do not inline me');
}
$(x);
`````

## Settled


`````js filename=intro
const f /*:unknown*/ = console.log(`ok`);
if ($) {
  $(f);
  const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
  $(tmpClusterSSA_x);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = console.log(`ok`);
if ($) {
  $(f);
  $($(`do not inline me`));
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let danger = function () {
  debugger;
  if ($) {
    danger = null;
    return 1;
  }
};
const f = console.log(`ok`);
let x = danger();
if ($) {
  $(f);
  x = $(`do not inline me`);
}
$(x);
`````

## Normalized


`````js filename=intro
let danger = function () {
  debugger;
  if ($) {
    danger = null;
    return 1;
  } else {
    return undefined;
  }
};
const f = console.log(`ok`);
let x = danger();
if ($) {
  $(f);
  x = $(`do not inline me`);
} else {
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = console.log( "ok" );
if ($) {
  $( a );
  const b = $( "do not inline me" );
  $( b );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 'do not inline me'
 - 3: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
