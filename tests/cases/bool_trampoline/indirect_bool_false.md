# Preval test case

# indirect_bool_false.md

> Bool trampoline > Indirect bool false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> The func uses the arg, being an indirect alias for Boolean

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

if (f($(0))) $('fail');
else $('pass');
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
if (f($(0))) $(`fail`);
else $(`pass`);
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
const tmpCalleeParam = $(0);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  $(`fail`);
} else {
  $(`pass`);
}
`````

## Output


`````js filename=intro
const f /*:(unknown)=>boolean*/ = function ($$0) {
  const arg = $$0;
  debugger;
  const x = $(arg);
  const y /*:boolean*/ = Boolean(x);
  return y;
};
$(f);
$(f);
const tmpCalleeParam = $(0);
const tmpBoolTrampoline = $(tmpCalleeParam);
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
  const b = $$0;
  debugger;
  const c = $( b );
  const d = Boolean( c );
  return d;
};
$( a );
$( a );
const e = $( 0 );
const f = $( e );
if (f) {
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
 - 4: 0
 - 5: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
