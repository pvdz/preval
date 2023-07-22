# Preval test case

# indirect_bool_true.md

> Bool trampoline > Indirect bool true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.

#TODO

## Input

`````js filename=intro
function f(arg) {
  const x = $(arg);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f($(100))) $('pass');
else $('fail');
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const x = $(arg);
  const y = Boolean(x);
  return y;
};
$(f);
$(f);
if (f($(100))) $(`pass`);
else $(`fail`);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const x = $(arg);
  const y = Boolean(x);
  return y;
};
$(f);
$(f);
const tmpCallCallee = f;
const tmpCalleeParam = $(100);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const arg = $$0;
  debugger;
  const x = $(arg);
  const y = Boolean(x);
  return y;
};
$(f);
$(f);
const tmpCalleeParam = $(100);
const tmpBoolTrampoline = $(tmpCalleeParam);
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
  const e = Boolean( d );
  return e;
};
$( a );
$( a );
const f = $( 100 );
const g = $( f );
if (g) {
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
 - 4: 100
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
