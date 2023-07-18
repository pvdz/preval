# Preval test case

# ref_after_else_nested_inside.md

> Ssa > Ref after else nested inside
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if ($) {
      x = $(2);
      $(x);
    } else {
      // Cannot reach the write but should not prevent SSA
      $(x);
    }
  } else {
    $('else');
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if ($) {
    if ($) {
      x = $(2);
      $(x);
    } else {
      $(x);
    }
  } else {
    $(`else`);
  }
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
    return undefined;
  } else {
    $(`else`);
    return undefined;
  }
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
  if ($) {
    const tmpClusterSSA_x = $(2);
    $(tmpClusterSSA_x);
  } else {
    $(`else`);
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  if ($) {
    const a = $( 2 );
    $( a );
  }
  else {
    $( "else" );
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
