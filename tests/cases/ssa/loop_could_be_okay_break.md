# Preval test case

# loop_could_be_okay_break.md

> Ssa > Loop could be okay break
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

The conditional break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  while (true) {
    x = $(2);
    $(x);
    if ($) break;
  }
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
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
  if ($) {
  } else {
    while ($LOOP_UNROLL_10) {
      const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
      $(tmpClusterSSA_x$1);
      if ($) {
        break;
      } else {
      }
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  const a = $( 2 );
  $( a );
  if ($) {

  }
  else {
    while ($LOOP_UNROLL_10) {
      const b = $( 2 );
      $( b );
      if ($) {
        break;
      }
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
