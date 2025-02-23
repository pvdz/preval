# Preval test case

# indirect_inv_false.md

> Bool trampoline > Indirect inv false
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
> The func uses the arg, being an indirect alias for Boolean

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

if (f(0)) $('pass');
else $('fail');
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
if (f(0)) $(`pass`);
else $(`fail`);
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
const tmpIfTest = f(0);
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
`````

## Output


`````js filename=intro
const f /*:(unknown)=>boolean*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  const x /*:unknown*/ = $(arg);
  const y /*:boolean*/ = !x;
  return y;
};
$(f);
$(f);
const tmpBoolTrampoline /*:unknown*/ = $(0);
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
  const d = !c;
  return d;
};
$( a );
$( a );
const e = $( 0 );
if (e) {
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
