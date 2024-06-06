# Preval test case

# base_break.md

> If tail extending > Base break
>
> Break should also flip

#TODO

## Input

`````js filename=intro
function f() {
  while (x) {
    $(1);
    if ($) {
      break;
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
      break;
    }
    $(2);
  }
};
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
        break;
      } else {
        $(2);
      }
    } else {
      break;
    }
  }
  return undefined;
};
f();
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
if (x) {
  $(1);
  if ($) {
    $tmpLoopUnrollCheck = false;
  } else {
    $(2);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(1);
      if ($) {
        break;
      } else {
        $(2);
      }
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
if (x) {
  $( 1 );
  if ($) {
    a = false;
  }
  else {
    $( 2 );
  }
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    if (x) {
      $( 1 );
      if ($) {
        break;
      }
      else {
        $( 2 );
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
