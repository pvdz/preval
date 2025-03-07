# Preval test case

# returned_and_used.md

> Return param > Returned and used
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
function f(x) {
  let y = x + 1;
  $(y);
  return y;
}
$(f(1));
$(f(2));
$(f('three'));
`````

## Settled


`````js filename=intro
$(2);
$(2);
$(3);
$(3);
$(`three1`);
$(`three1`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(2);
$(3);
$(3);
$(`three1`);
$(`three1`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = x + 1;
  $(y);
  return y;
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  let y = x + 1;
  $(y);
  return y;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( 2 );
$( 3 );
$( 3 );
$( "three1" );
$( "three1" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 3
 - 4: 3
 - 5: 'three1'
 - 6: 'three1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
