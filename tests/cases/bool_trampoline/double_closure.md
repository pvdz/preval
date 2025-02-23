# Preval test case

# double_closure.md

> Bool trampoline > Double closure
>
> The func updates two closures, which complicates the transform.

## Input

`````js filename=intro
let x;
let y;
function f() {
  x = $(100);
  y = Boolean(x);
  return y;
}

// Prevent simple inlining
$(f);
$(f);

if (f()) $('pass');
else $('fail');
$(x);
$(y);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  x = $(100);
  y = Boolean(x);
  return y;
};
let x;
let y;
$(f);
$(f);
if (f()) $(`pass`);
else $(`fail`);
$(x);
$(y);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  x = $(100);
  y = Boolean(x);
  return y;
};
let x = undefined;
let y = undefined;
$(f);
$(f);
const tmpIfTest = f();
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
$(y);
`````

## Output


`````js filename=intro
const f /*:()=>primitive*/ = function () {
  debugger;
  x = $(100);
  y = Boolean(x);
  return y;
};
let x /*:unknown*/ = undefined;
let y /*:primitive*/ = undefined;
$(f);
$(f);
f();
const tmpIfTest /*:unknown*/ = y;
if (tmpIfTest) {
  $(`pass`);
} else {
  $(`fail`);
}
$(x);
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b = $( 100 );
  c = Boolean( b );
  return c;
};
let b = undefined;
let c = undefined;
$( a );
$( a );
a();
const d = c;
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
$( b );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: 100
 - 4: 'pass'
 - 5: 100
 - 6: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
