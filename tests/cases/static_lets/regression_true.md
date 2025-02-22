# Preval test case

# regression_true.md

> Static lets > Regression true
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
if ($) {
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
if ($) {
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
if ($) {
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
  const args /*:array*/ = $$0;
  debugger;
  $(...args);
  x = `fail`;
  return undefined;
};
let x /*:primitive*/ = 5;
$(5);
if ($) {
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
  const b = $$0;
  debugger;
  $( ...b );
  c = "fail";
  return undefined;
};
let c = 5;
$( 5 );
if ($) {
  c = 10;
  a( 10, "a" );
}
else {
  c = 20;
  a( 20, "b" );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 10, 'a'
 - 3: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
