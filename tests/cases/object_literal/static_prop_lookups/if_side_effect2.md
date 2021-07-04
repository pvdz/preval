# Preval test case

# if_side_effect2.md

> Object literal > Static prop lookups > If side effect2
>
> A binding that is updated in a function called in one branch that is not actually visited should not be a problem.

#TODO

## Input

`````js filename=intro
const f = function () {
  let x = 1;
  const g = function () {
    x = 2;
    return undefined;
  };
  if ($) {
  } else {
    g();
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  if ($) {
  } else {
    g();
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  if ($) {
  } else {
    g();
  }
  $(x);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  $(1);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
