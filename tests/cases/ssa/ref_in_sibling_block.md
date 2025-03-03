# Preval test case

# ref_in_sibling_block.md

> Ssa > Ref in sibling block
>
> What happens if there are future refs but they are in a sibling branch

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    if (a) {
      x = $(2);
      $(x);
    }
    {
      $(x);
    }
  } else {
    // Cannot reach the write but should not prevent SSA
    $(x);
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
    if (a) {
      x = $(2);
      $(x);
    }
    {
      $(x);
    }
  } else {
    $(x);
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
    if (a) {
      x = $(2);
      $(x);
    } else {
    }
    $(x);
    return undefined;
  } else {
    $(x);
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
  let x /*:unknown*/ = $(1);
  if ($) {
    if (a) {
      x = $(2);
      $(x);
    } else {
    }
    $(x);
  } else {
    $(x);
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let b = $( 1 );
  if ($) {
    if (a) {
      b = $( 2 );
      $( b );
    }
    $( b );
  }
  else {
    $( b );
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
