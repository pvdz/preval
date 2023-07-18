# Preval test case

# delayed_access.md

> Function promo > Delayed access
>
> Trying to sketch the problem of access to a binding that was declared much later

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    if ($) $(x);
  }
  
  const x = $('x');
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
    if ($) $(x);
  };
  const x = $(`x`);
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
      $(x);
      return undefined;
    } else {
      return undefined;
    }
  };
  const x = $(`x`);
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
  const x = $(`x`);
  if ($) {
    $(x);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( "x" );
  if ($) {
    $( a );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'x'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
