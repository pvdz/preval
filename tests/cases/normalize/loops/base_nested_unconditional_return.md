# Preval test case

# base_nested_unconditional_return.md

> Normalize > Loops > Base nested unconditional return
>
> A nested loop with an unconditional early return

## Input

`````js filename=intro
function f() {
  $('outer');
  while (true) {
    $('middle');
    while (true) {
      $('inner');
      return 100;
    }  
  }
}
$(f());
`````

## Settled


`````js filename=intro
$(`outer`);
$(`middle`);
$(`inner`);
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`outer`);
$(`middle`);
$(`inner`);
$(100);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`outer`);
  while (true) {
    $(`middle`);
    while (true) {
      $(`inner`);
      return 100;
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`outer`);
  while (true) {
    $(`middle`);
    while (true) {
      $(`inner`);
      return 100;
    }
  }
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "outer" );
$( "middle" );
$( "inner" );
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'outer'
 - 2: 'middle'
 - 3: 'inner'
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
