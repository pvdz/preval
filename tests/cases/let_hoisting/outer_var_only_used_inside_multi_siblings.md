# Preval test case

# outer_var_only_used_inside_multi_siblings.md

> Let hoisting > Outer var only used inside multi siblings
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

This one has two occurrences in the same scope. The test makes sure we don't accidentally create two vars in the same scope.

#TODO

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    x = $(1, 'a');
    $(x, 'b');

    x = $(2, 'c');
    $(x, 'd');
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
    x = $(1, 'a');
    $(x, 'b');
    x = $(2, 'c');
    $(x, 'd');
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
    x = $(1, 'a');
    $(x, 'b');
    x = $(2, 'c');
    $(x, 'd');
    return undefined;
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
const f = function () {
  debugger;
  if ($) {
    const tmpssa2_x = $(1, 'a');
    $(tmpssa2_x, 'b');
    const tmpSSA_tmpssa2_x = $(2, 'c');
    $(tmpSSA_tmpssa2_x, 'd');
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
 - 3: 2, 'c'
 - 4: 2, 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
