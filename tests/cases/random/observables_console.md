# Preval test case

# observables_console.md

> Random > Observables console
>
> Just covering

## Input

`````js filename=intro
const f = function() {
  debugger;
  const x = $(1);
  let y = false;
  console.log('hi');
  y = ! x;
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
  console.log(`hi`);
  y = !x;
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
  console.log(`hi`);
  y = !x;
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
const f /*:()=>boolean*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  console.log(`hi`);
  $(`block`);
  $(`block`);
  const y /*:boolean*/ = !x;
  return y;
};
f();
const tmpCalleeParam /*:boolean*/ = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  console.log( "hi" );
  $( "block" );
  $( "block" );
  const c = !b;
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
 - 7: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
