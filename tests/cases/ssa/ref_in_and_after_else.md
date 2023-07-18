# Preval test case

# ref_in_and_after_else.md

> Ssa > Ref in and after else
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
    // This ref can not reach the assign but it should not prevent SSA
    $(x);
  }
  // This ref can not reach the assign and does prevent SSA
  $(x);
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
    $(x);
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
  if ($) {
    x = $(2);
    $(x);
  } else {
    $(x);
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
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
    $(x);
  }
  $(x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = $( 1 );
  if ($) {
    a = $( 2 );
    $( a );
  }
  else {
    $( a );
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
