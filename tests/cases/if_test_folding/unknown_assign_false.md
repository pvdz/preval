# Preval test case

# unknown_assign_false.md

> If test folding > Unknown assign false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(0);
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  $(`block`);
  $(`block`);
  return y;
};
f();
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
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
  const x /*:unknown*/ = $(0);
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
  const b = $( 0 );
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
 - 1: 0
 - 2: 'block'
 - 3: 'block'
 - 4: 0
 - 5: 'block'
 - 6: 'block'
 - 7: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
