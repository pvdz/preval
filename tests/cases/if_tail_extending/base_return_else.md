# Preval test case

# base_return_else.md

> If tail extending > Base return else
>
> Break should also flip

## Input

`````js filename=intro
const x = $();
function f() {
  while (x) {
    $(1);
    if ($) {
    } else {
      return;
    }
    $(2);
  }
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while (x) {
    $(1);
    if ($) {
    } else {
      return;
    }
    $(2);
  }
};
const x = $();
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    if (x) {
      $(1);
      if ($) {
        $(2);
      } else {
        return undefined;
      }
    } else {
      break;
    }
  }
  return undefined;
};
const x = $();
f();
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  $(1);
  if ($) {
    while ($LOOP_UNROLL_10) {
      $(2);
      $(1);
      if ($) {
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  if ($) {
    while ($LOOP_UNROLL_10) {
      $( 2 );
      $( 1 );
      if ($) {

      }
      else {
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
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
