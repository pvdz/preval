# Preval test case

# ref_in_sibling_if_after.md

> Ssa > Ref in sibling if after
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
    if ($) {
      $(x);
      return undefined;
    } else {
      return undefined;
    }
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
  $(1);
  if ($) {
    const tmpSSA_x = $(2);
    $(tmpSSA_x);
    if ($) {
      $(tmpSSA_x);
      return undefined;
    } else {
      return undefined;
    }
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
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
