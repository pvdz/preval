# Preval test case

# ref_after_else.md

> Ssa > Ref after else
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
  }
  // This ref can not reach the assign and so it prevents SSA
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
  let x /*:unknown*/ = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
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
