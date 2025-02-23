# Preval test case

# complex_rhs.md

> Let hoisting > Complex rhs
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
const f = function () {
  if ($) $(x);
};
let x = danger(); // End goal is to move this to be between `danger` and `f`
if ($) {
  f();
  x = $('do not inline me');
}
$(x);
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
const f = function () {
  debugger;
  if ($) $(x);
};
let x = danger();
if ($) {
  f();
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
const f = function () {
  debugger;
  if ($) {
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
let x = danger();
if ($) {
  f();
  x = $(`do not inline me`);
} else {
}
$(x);
`````

## Output


`````js filename=intro
if ($) {
  $(1);
  if ($) {
    const tmpClusterSSA_x /*:unknown*/ = $(`do not inline me`);
    $(tmpClusterSSA_x);
  } else {
  }
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  if ($) {
    const a = $( "do not inline me" );
    $( a );
  }
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'do not inline me'
 - 3: 'do not inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
