# Preval test case

# base.md

> Assign hoisting > Base
>
> Trying to move var decls that are functions down to move let decls closer to their real init.

## Input

`````js filename=intro
let x = undefined;
const f = function(){
  if ($) {
    $('block inlining');
    $(x);
  }
};
x = $(2);
if ($) {
  f();
  x = $(3); // Change x
} else {
  $(x); // Observe x
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
const f = function () {
  debugger;
  if ($) {
    $(`block inlining`);
    $(x);
  }
};
x = $(2);
if ($) {
  f();
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const f = function () {
  debugger;
  if ($) {
    $(`block inlining`);
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
x = $(2);
if ($) {
  f();
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(2);
if ($) {
  $(`block inlining`);
  $(x);
  x = $(3);
} else {
  $(x);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 2 );
if ($) {
  $( "block inlining" );
  $( a );
  a = $( 3 );
}
else {
  $( a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 'block inlining'
 - 3: 2
 - 4: 3
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
