# Preval test case

# outer_var_only_used_inside_multi_each.md

> Let hoisting > Outer var only used inside multi each
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one two branches each with a write and a read.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    if ($) {
      x = $(1, 'a');
      $(x, 'b');
    } else {
      x = $(2, 'c');
      $(x, 'd');
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
    if ($) {
      x = $(1, 'a');
      $(x, 'b');
    } else {
      x = $(2, 'c');
      $(x, 'd');
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
    if ($) {
      x = $(1, 'a');
      $(x, 'b');
      return undefined;
    } else {
      x = $(2, 'c');
      $(x, 'd');
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
  if ($) {
    const tmpSSA_tmpssa2_x = $(1, 'a');
    $(tmpSSA_tmpssa2_x, 'b');
    return undefined;
  } else {
    const tmpSSA_tmpssa2_x$1 = $(2, 'c');
    $(tmpSSA_tmpssa2_x$1, 'd');
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
 - 1: 1, 'a'
 - 2: 1, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
