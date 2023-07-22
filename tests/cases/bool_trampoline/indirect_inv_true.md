# Preval test case

# indirect_inv_true.md

> Bool trampoline > Indirect inv true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.

#TODO

## Input

`````js filename=intro
function f(arg) {
  const x = $(arg);
  const y = !x;
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f(100)) $('fail');
else $('pass');
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const x = $(arg);
  const y = !x;
  return y;
};
$(f);
$(f);
if (f(100)) $(`fail`);
else $(`pass`);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const x = $(arg);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpIfTest = f(100);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const arg = $$0;
  debugger;
  const x = $(arg);
  const y = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline = $(100);
if (tmpBoolTrampoline) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = $( b );
  const e = !d;
  return e;
};
$( a );
$( a );
const f = $( 100 );
if (f) {
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
 - 3: 100
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
