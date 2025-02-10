# Preval test case

# yield.md

> Bool trampoline > Yield
>
> Don't do this.

This is testing a cloning edge case when it concerns `yield`

## Input

`````js filename=intro
function *f(x) {
  x = $(0);
  const y = yield x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass'); // Always returns an object and objects are truthy
else $('fail');
`````

## Pre Normal


`````js filename=intro
let f = function* ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = yield x;
  return y;
};
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
`````

## Normalized


`````js filename=intro
let f = function* ($$0) {
  let x = $$0;
  debugger;
  x = $(0);
  const y = yield x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const f /*:(unknown)=>?*/ = function* ($$0) {
  debugger;
  const tmpClusterSSA_x = $(0);
  const y = yield tmpClusterSSA_x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function *($$0 ) {
  debugger;
  const b = $( 0 );
  const c = yield ( b );
  return c;
};
$( a );
$( a );
const d = a();
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
