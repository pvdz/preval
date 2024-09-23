# Preval test case

# regression_false.md

> Static lets > Regression false
>
> If the read of a value of a `let` binding can be determined then we should inline it.

Bug was always looking at the first element of each branch, rather than the last.

## Input

`````js filename=intro
const oops = function(...args) {
  $(...args);
  x = 'fail';
}
let x = 5;
$(x);
if ($(false)) {
  x = 10;
  oops(x, 'a');
} else {
  x = 20;
  oops(x, 'b');
}
$(x);
`````

## Pre Normal


`````js filename=intro
const oops = function (...$$0) {
  let args = $$0;
  debugger;
  $(...args);
  x = `fail`;
};
let x = 5;
$(x);
if ($(false)) {
  x = 10;
  oops(x, `a`);
} else {
  x = 20;
  oops(x, `b`);
}
$(x);
`````

## Normalized


`````js filename=intro
const oops = function (...$$0) {
  let args = $$0;
  debugger;
  $(...args);
  x = `fail`;
  return undefined;
};
let x = 5;
$(x);
const tmpIfTest = $(false);
if (tmpIfTest) {
  x = 10;
  oops(x, `a`);
} else {
  x = 20;
  oops(x, `b`);
}
$(x);
`````

## Output


`````js filename=intro
const oops /*:(unknown)=>undefined*/ = function (...$$0) {
  const args = $$0;
  debugger;
  $(...args);
  x = `fail`;
  return undefined;
};
let x = 5;
$(5);
const tmpIfTest = $(false);
if (tmpIfTest) {
  x = 10;
  oops(10, `a`);
} else {
  x = 20;
  oops(20, `b`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  $( ...b );
  d = "fail";
  return undefined;
};
let d = 5;
$( 5 );
const e = $( false );
if (e) {
  d = 10;
  a( 10, "a" );
}
else {
  d = 20;
  a( 20, "b" );
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: false
 - 3: 20, 'b'
 - 4: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
