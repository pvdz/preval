# Preval test case

# implicit_global_left.md

> Tofix > Implicit global left
>
> x becomes an implicit global

## Input

`````js filename=intro
let f;
{
  let x;
  f = function() {
    x = $(100);
    const y = Boolean(x);
    return y;
  }
}

// Prevent simple inlining
$(f);

if (f()) $('pass');
else $('fail');
$(x);
`````

## Pre Normal


`````js filename=intro
let f;
{
  let x$1;
  f = function () {
    debugger;
    x$1 = $(100);
    const y = Boolean(x$1);
    return y;
  };
}
$(f);
if (f()) $(`pass`);
else $(`fail`);
$(x);
`````

## Normalized


`````js filename=intro
let f = undefined;
let x$1 = undefined;
f = function () {
  debugger;
  x$1 = $(100);
  const y = Boolean(x$1);
  return y;
};
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
const f = function () {
  debugger;
  const tmpssa2_x$1 = $(100);
  const y = Boolean(tmpssa2_x$1);
  return y;
};
$(f);
const tmpBoolTrampoline = $(100);
if (tmpBoolTrampoline) {
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
  const b = $( 100 );
  const c = Boolean( b );
  return c;
};
$( a );
const d = $( 100 );
if (d) {
  $( "pass" );
}
else {
  $( "fail" );
}
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 100
 - 3: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
