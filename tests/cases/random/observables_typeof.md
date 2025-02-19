# Preval test case

# observables_typeof.md

> Random > Observables typeof
>
> Just covering

## Input

`````js filename=intro
const f = function() {
  debugger;
  const x = $(1);
  let y = false;
  y = typeof x;
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  let y = false;
  y = typeof x;
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const x = $(1);
  let y = false;
  y = typeof x;
  $(`block`);
  $(`block`);
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:()=>string*/ = function () {
  debugger;
  const x = $(1);
  $(`block`);
  $(`block`);
  const y /*:string*/ = typeof x;
  return y;
};
f();
const tmpCalleeParam /*:string*/ = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( "block" );
  $( "block" );
  const c = typeof b;
  return c;
};
a();
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'block'
 - 3: 'block'
 - 4: 1
 - 5: 'block'
 - 6: 'block'
 - 7: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
