# Preval test case

# param_is_primitive.md

> Static arg ops > Assignment > Param is primitive

## Input

`````js filename=intro
let a = 1;
function f(b) {
  b = 100;
  $(b);
}
$(f);
f(10);
f(11);
f(12);
$(3);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let b = $$0;
  debugger;
  b = 100;
  $(b);
};
let a = 1;
$(f);
f(10);
f(11);
f(12);
$(3);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let b = $$0;
  debugger;
  b = 100;
  $(b);
  return undefined;
};
let a = 1;
$(f);
f(10);
f(11);
f(12);
$(3);
`````

## Output


`````js filename=intro
const f /*:(unused)=>*/ = function ($$0) {
  debugger;
  $(100);
  return undefined;
};
$(f);
$(100);
$(100);
$(100);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  debugger;
  $( 100 );
  return undefined;
};
$( a );
$( 100 );
$( 100 );
$( 100 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
