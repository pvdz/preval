# Preval test case

# assign_to_param2.md

> Bool trampoline > Assign to param2
>
> Don't do this.

## Input

`````js filename=intro
function f(y) {
  const x = $(0);
  y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('fail');
else $('pass');
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = $(0);
  y = Boolean(x);
  return y;
};
$(f);
$(f);
if (f()) $(`fail`);
else $(`pass`);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = $(0);
  y = Boolean(x);
  return y;
};
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const f = function ($$0) {
  debugger;
  const x = $(0);
  const tmpSSA_y = Boolean(x);
  return tmpSSA_y;
};
$(f);
$(f);
const tmpBoolTrampoline = $(0);
if (tmpBoolTrampoline) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  debugger;
  const b = $( 0 );
  const c = Boolean( b );
  return c;
};
$( a );
$( a );
const d = $( 0 );
if (d) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 0
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
