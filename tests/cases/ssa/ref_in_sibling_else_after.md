# Preval test case

# ref_in_sibling_else_after.md

> Ssa > Ref in sibling else after
>
> What happens if there are future refs but they are in a sibling branch

#TODO

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  }
  if ($) {
    $('if');
  } else {
    // This should prevent SSA
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
    x = $(2);
    $(x);
  }
  if ($) {
    $('if');
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
    x = $(2);
    $(x);
  } else {
  }
  if ($) {
    $('if');
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
  let x = $(1);
  if ($) {
    x = $(2);
    $(x);
  } else {
  }
  if ($) {
    $('if');
  } else {
    $(x);
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 'if'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
