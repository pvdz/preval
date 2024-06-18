# Preval test case

# outer_var_only_used_inside_once.md

> Let hoisting > Outer var only used inside once
>
> A variable that is declared in an outer scope but only used inside a scope without using its initial value is not a closure at all.

If we can detect that every read is invariantly preceded by a write then the initial value is irrelevant.

## Input

`````js filename=intro
function f() {
  let x = undefined;
  function g() {
    if ($) {
      x = $(1, 'a');
      $(x, 'b');
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
      x = $(1, `a`);
      $(x, `b`);
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
      x = $(1, `a`);
      $(x, `b`);
      return undefined;
    } else {
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
if ($) {
  const tmpClusterSSA_tmpssa2_x = $(1, `a`);
  $(tmpClusterSSA_tmpssa2_x, `b`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 1, "a" );
  $( a, "b" );
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
