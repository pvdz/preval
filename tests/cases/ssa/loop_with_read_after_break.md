# Preval test case

# loop_with_read_after_break.md

> Ssa > Loop with read after break
>
> The read afterwards makes SSA not worth it

The break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
  $(x);
}
if ($) f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
  $(x);
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) {
      break;
    } else {
    }
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  $(1);
  let x = $(2);
  $(x);
  if ($) {
  } else {
    while ($LOOP_UNROLL_10) {
      x = $(2);
      $(x);
      if ($) {
        break;
      } else {
      }
    }
  }
  $(x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  let a = $( 2 );
  $( a );
  if ($) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      a = $( 2 );
      $( a );
      if ($) {
        break;
      }
    }
  }
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
