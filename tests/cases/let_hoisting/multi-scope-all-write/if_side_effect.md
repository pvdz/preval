# Preval test case

# if_side_effect.md

> Let hoisting > Multi-scope-all-write > If side effect
>
> A binding that is updated in a function called in one branch that is not actually visited should not be a problem.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  const g = function() {
    x = 2;
  };
  if ($) {
    g();
  }
  $(x);
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
  };
  if ($) {
    g();
  }
  $(x);
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  if ($) {
    g();
  } else {
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
  $(2);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
