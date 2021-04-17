# Preval test case

# back2back_ok.md

> Ssa > Back2back ok
>
> Assignment of a func

#TODO

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = undefined;
    x = function(){};
    $(x);
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
    };
    $(x);
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = undefined;
    x = function () {
      debugger;
      return undefined;
    };
    $(x);
    return undefined;
  } else {
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
const tmpSSA_x = function () {
  debugger;
  return undefined;
};
const f = function () {
  debugger;
  if ($) {
    $(tmpSSA_x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
