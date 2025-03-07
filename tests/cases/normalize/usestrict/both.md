# Preval test case

# both.md

> Normalize > Usestrict > Both
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";
function f() {
  "use strict";
  return $();
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  `use strict`;
  return $();
};
`use strict`;
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $();
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
