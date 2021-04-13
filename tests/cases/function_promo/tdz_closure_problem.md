# Preval test case

# tdz_closure_problem.md

> Function promo > Tdz closure problem
>
> If a binding occurred after the reference the algorithm should not assume that the closure was referenced

This kind of problem should have been skirted by having unique names in the first place...

#TODO

## Input

`````js filename=intro
function f() {
  let x = $('outer');
  function g() {
    // This function should be hoistable to global because x is not a closure
    $(x); // This read triggers TDZ at runtime
    let x = $('inner');
    if ($) $('prevent premature elimination');
  }
  
  g();
  if ($) $('prevent premature elimination');
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(x$1);
    let x$1 = $('inner');
    if ($) $('prevent premature elimination');
  };
  let x = $('outer');
  g();
  if ($) $('prevent premature elimination');
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(x$1);
    let x$1 = $('inner');
    if ($) {
      $('prevent premature elimination');
      return undefined;
    } else {
      return undefined;
    }
  };
  let x = $('outer');
  g();
  if ($) {
    $('prevent premature elimination');
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
  $(x$1);
  const x$1 = $('inner');
  if ($) {
    $('prevent premature elimination');
    return undefined;
  } else {
    return undefined;
  }
};
const f = function () {
  debugger;
  $('outer');
  g();
  if ($) {
    $('prevent premature elimination');
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
 - 1: 'outer'
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
