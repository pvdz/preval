# Preval test case

# nested.md

> Tofix > Nested

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
const g = function () {
  debugger;
  const a /*:array*/ = [1, 2, 3];
  const b /*:array*/ = [1, 2, 3];
  const ab /*:boolean*/ = a === b;
  $(ab);
  const c /*:array*/ = [1, 2, 3];
  const d /*:array*/ = [1, 2, 3];
  const cd /*:boolean*/ = c !== d;
  $(cd);
  const e /*:array*/ = [1, 2, 3];
  const f /*:array*/ = [1, 2, 3];
  const ef /*:boolean*/ = e === f;
  $(ef);
  const g$1 /*:array*/ = [1, 2, 3];
  return g$1;
};
const x = g();
const y = g();
const xy /*:boolean*/ = x === y;
$(xy);
const z = g();
$(z);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  const c = [ 1, 2, 3 ];
  const d = b === c;
  $( d );
  const e = [ 1, 2, 3 ];
  const f = [ 1, 2, 3 ];
  const g = e !== f;
  $( g );
  const h = [ 1, 2, 3 ];
  const i = [ 1, 2, 3 ];
  const j = h === i;
  $( j );
  const k = [ 1, 2, 3 ];
  return k;
};
const l = a();
const m = a();
const n = l === m;
$( n );
const o = a();
$( o );
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
