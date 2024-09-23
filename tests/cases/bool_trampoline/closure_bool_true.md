# Preval test case

# closure_bool_true.md

> Bool trampoline > Closure bool true
>
> A bool trampoline has an arbitrary expression, coerces it to bool, and returns the bool.
>
> This case does not use the func arg.

## Input

`````js filename=intro
let x = 1;
function f() {
  x = $(1);
  const y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  x = $(1);
  const y = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  x = $(1);
  const y = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  x = $(1);
  const y /*:boolean*/ = Boolean(x);
  return y;
};
let x = 1;
$(f);
$(f);
x = $(1);
if (x) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 1 );
  const c = Boolean( b );
  return c;
};
let b = 1;
$( a );
$( a );
b = $( 1 );
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 1
 - 4: 'pass'
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
