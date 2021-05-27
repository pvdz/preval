# Preval test case

# base_throw.md

> If tail extending > Base throw
>
> Break should also flip

#TODO

## Input

`````js filename=intro
function f() {
  while (x) {
    $(1);
    if ($) {
      throw "error";
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
      throw 'error';
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
      throw 'error';
    } else {
      $(2);
    }
  }
  return undefined;
};
f();
`````

## Output

`````js filename=intro
while (x) {
  $(1);
  if ($) {
    throw 'error';
  } else {
    $(2);
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
