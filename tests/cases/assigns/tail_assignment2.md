# Preval test case

# tail_assignment2.md

> Assigns > Tail assignment2
>
> An assignment at the end of a function may be dead code

## Input

`````js filename=intro
function f() {
  let x = $(1);
  $(x, 'middle');
  x = $(x, 'observable rhs'); // main point is getting rid of this assignment, safely
  return $('end');
}
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  $(x, `middle`);
  x = $(x, `observable rhs`);
  return $(`end`);
};
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  $(x, `middle`);
  x = $(x, `observable rhs`);
  const tmpReturnArg = $(`end`);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:()=>?*/ = function () {
  debugger;
  const x = $(1);
  $(x, `middle`);
  $(x, `observable rhs`);
  const tmpReturnArg = $(`end`);
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  $( b, "middle" );
  $( b, "observable rhs" );
  const c = $( "end" );
  return c;
};
const d = a();
$( d );
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'middle'
 - 3: 1, 'observable rhs'
 - 4: 'end'
 - 5: 'end'
 - 6: 1
 - 7: 1, 'middle'
 - 8: 1, 'observable rhs'
 - 9: 'end'
 - 10: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
