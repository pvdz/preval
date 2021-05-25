# Preval test case

# base_return_else.md

> If tail extending > Base return else
>
> Break should also flip

#TODO

## Input

`````js filename=intro
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
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (x) {
    $(1);
    if ($) {
    } else {
      return undefined;
    }
    $(2);
  }
  return undefined;
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  while (x) {
    $(1);
    if ($) {
      $(2);
    } else {
      return undefined;
    }
  }
  return undefined;
};
f();
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
