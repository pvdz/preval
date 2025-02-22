# Preval test case

# nested.md

> Tests > Tofix > Nested

Function that ends with returning a self-contained value can maybe be outlined? Not sure if this risks bloat.

## Input

`````js filename=intro
const g = function () {
  debugger;
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const ab = a === b;
  $(ab);
  const c = [1, 2, 3];
  const d = [1, 2, 3];
  const cd = c !== d;
  $(cd);
  const e = [1, 2, 3];
  const f = [1, 2, 3];
  const ef = e === f;
  $(ef);
  const g = [1, 2, 3]; // <- could just outline this right
  return g;
};
const x = g();
const y = g();
const xy = x === y;
$(xy);
const z = g();
$(z);
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const ab = a === b;
  $(ab);
  const c = [1, 2, 3];
  const d = [1, 2, 3];
  const cd = c !== d;
  $(cd);
  const e = [1, 2, 3];
  const f = [1, 2, 3];
  const ef = e === f;
  $(ef);
  const g$1 = [1, 2, 3];
  return g$1;
};
const x = g();
const y = g();
const xy = x === y;
$(xy);
const z = g();
$(z);
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const ab = a === b;
  $(ab);
  const c = [1, 2, 3];
  const d = [1, 2, 3];
  const cd = c !== d;
  $(cd);
  const e = [1, 2, 3];
  const f = [1, 2, 3];
  const ef = e === f;
  $(ef);
  const g$1 = [1, 2, 3];
  return g$1;
};
const x = g();
const y = g();
const xy = x === y;
$(xy);
const z = g();
$(z);
`````

## Output


`````js filename=intro
const g /*:()=>array*/ = function () {
  debugger;
  $(false);
  $(true);
  $(false);
  const g$1 /*:array*/ = [1, 2, 3];
  return g$1;
};
g();
g();
$(false);
const z /*:array*/ = g();
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( false );
  $( true );
  $( false );
  const b = [ 1, 2, 3 ];
  return b;
};
a();
a();
$( false );
const c = a();
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - 4: false
 - 5: true
 - 6: false
 - 7: false
 - 8: false
 - 9: true
 - 10: false
 - 11: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
