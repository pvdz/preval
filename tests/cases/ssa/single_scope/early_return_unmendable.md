# Preval test case

# early_return_unmendable.md

> Ssa > Single scope > Early return unmendable
>
> Figure out why the early returns are not allowing the var to be SSA'd

This is "unmendable" because the return structures can't all be given an explicit return

#TODO

## Input

`````js filename=intro
const tmpLabeledBlockFunc$3 = function (x) {
  if ($(1)) {
    if ($) {
      // SSA this
      x = $(1);
      $(x);
      return;
    } else {
      $(2);
    }
  } else {
    $(3);
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
  if ($(1)) {
    if ($) {
      x = $(1);
      $(x);
      return;
    } else {
      $(2);
    }
  } else {
    $(3);
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    if ($) {
      x = $(1);
      $(x);
      return undefined;
    } else {
      $(2);
    }
  } else {
    $(3);
  }
  $(x);
  return undefined;
};
$(tmpLabeledBlockFunc$3);
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc$3 = function ($$0) {
  let x = $$0;
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    if ($) {
      x = $(1);
      $(x);
      return undefined;
    } else {
      $(2);
    }
  } else {
    $(3);
  }
  $(x);
  return undefined;
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
