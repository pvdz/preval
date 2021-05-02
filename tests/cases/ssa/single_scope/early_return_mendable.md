# Preval test case

# early_return_mendable.md

> Ssa > Single scope > Early return mendable
>
> Figure out why the early returns are not allowing the var to be SSA'd

This is "mendable" because the tail could be moved into the `else` block of the `if` and then the algorithm would be okay, considering the other ref in the other branch.

Of course the algorithm should be able to detect this SSA even without that trick.

#TODO

## Input

`````js filename=intro
const tmpLabeledBlockFunc$3 = function (x) {
  if ($) {
    // SSA this
    x = $(1);
    $(x);
    return;
  }
  $(x);
};
$(tmpLabeledBlockFunc$3);
`````

## Pre Normal

`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    x = $(1);
    $(x);
    return;
  }
  $(x);
};
$(tmpLabeledBlockFunc$3);
`````

## Normalized

`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  let x = $$0;
  debugger;
  if ($) {
    x = $(1);
    $(x);
    return undefined;
  } else {
  }
  $(x);
  return undefined;
};
$(tmpLabeledBlockFunc$3);
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  const x = $$0;
  debugger;
  if ($) {
    const tmpSSA_x = $(1);
    $(tmpSSA_x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
$(tmpLabeledBlockFunc$3);
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
