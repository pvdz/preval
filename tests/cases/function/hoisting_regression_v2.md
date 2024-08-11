# Preval test case

# hoisting_regression_v2.md

> Function > Hoisting regression v2
>
> In this case we don't return the inner function, we send it to $ where it escapes in a black hole
> Most likely, Preval can not determine that the return value of the outer function is unused
> and as such, the regression still shows more clearly.
> At the time of the regression, the pre-normal code clearly showed how the inner function was
> hoisted to the top of the outer function while the needle comes after a conditional return.
> The normalization step still hoists the needle inside the `else`, causing the inner function to
> lose access to the variable, which is the problem this test tries to expose.

## Input

`````js filename=intro
function outer() {
  if ($()) {
    return;
  }
  let okdezemoetjezoeken = 1
  $(inner);
  function inner() {
    $(okdezemoetjezoeken);
  }
}
$(outer);


`````

## Pre Normal


`````js filename=intro
let outer = function () {
  debugger;
  let inner = function () {
    debugger;
    $(okdezemoetjezoeken);
  };
  if ($()) {
    return;
  }
  let okdezemoetjezoeken = 1;
  $(inner);
};
$(outer);
`````

## Normalized


`````js filename=intro
let outer = function () {
  debugger;
  let inner = function () {
    debugger;
    $(okdezemoetjezoeken);
    return undefined;
  };
  const tmpIfTest = $();
  if (tmpIfTest) {
    return undefined;
  } else {
  }
  let okdezemoetjezoeken = 1;
  $(inner);
  return undefined;
};
$(outer);
`````

## Output


`````js filename=intro
const inner = function () {
  debugger;
  $(1);
  return undefined;
};
const outer = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    return undefined;
  } else {
    $(inner);
    return undefined;
  }
};
$(outer);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 1 );
  return undefined;
};
const b = function() {
  debugger;
  const c = $();
  if (c) {
    return undefined;
  }
  else {
    $( a );
    return undefined;
  }
};
$( b );
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
