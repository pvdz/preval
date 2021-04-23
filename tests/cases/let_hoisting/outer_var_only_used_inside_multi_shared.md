# Preval test case

# outer_var_only_used_inside_multi_shared.md

> Let hoisting > Outer var only used inside multi shared
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one tests a branch with one shared write and a read in both.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    x = $(1, 'shared');
    if ($) {
      $(x, 'a');
    } else {
      $(x, 'b');
    }
  }
  if ($) g();
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    x = $(1, 'shared');
    if ($) {
      $(x, 'a');
    } else {
      $(x, 'b');
    }
  };
  let x = undefined;
  if ($) g();
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    x = $(1, 'shared');
    if ($) {
      $(x, 'a');
      return undefined;
    } else {
      $(x, 'b');
      return undefined;
    }
  };
  let x = undefined;
  if ($) {
    g();
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
const g = function () {
  debugger;
  const tmpSSA_tmpssa2_x = $(1, 'shared');
  if ($) {
    $(tmpSSA_tmpssa2_x, 'a');
    return undefined;
  } else {
    $(tmpSSA_tmpssa2_x, 'b');
    return undefined;
  }
};
const f = function () {
  debugger;
  if ($) {
    g();
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
 - 1: 1, 'shared'
 - 2: 1, 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
