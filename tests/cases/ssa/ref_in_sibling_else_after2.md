# Preval test case

# ref_in_sibling_else_after2.md

> Ssa > Ref in sibling else after2
>
> What happens if there are future refs but they are in a sibling branch

Mirror test for back to back ifs. Feel free to ignore.

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
  } else {
    x = $(2);
    $(x);
  }
  if ($) {
    // This should prevent SSA
    $(x);
  } else {
    $('if');
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
  } else {
    x = $(2);
    $(x);
  }
  if ($) {
    $(x);
  } else {
    $(`if`);
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
  } else {
    x = $(2);
    $(x);
  }
  if ($) {
    $(x);
    return undefined;
  } else {
    $(`if`);
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
  let x = $(1);
  if ($) {
  } else {
    x = $(2);
    $(x);
  }
  if ($) {
    $(x);
  } else {
    $(`if`);
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
