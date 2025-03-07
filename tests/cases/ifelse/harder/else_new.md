# Preval test case

# else_new.md

> Ifelse > Harder > Else new
>
> The `new` operator is guaranteed to return an object which is always truthy

## Input

`````js filename=intro
if (new ($($))) $(2);
else $(3);
`````

## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
new tmpNewCallee();
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
new tmpNewCallee();
$(2);
`````

## Pre Normal


`````js filename=intro
if (new ($($))()) $(2);
else $(3);
`````

## Normalized


`````js filename=intro
const tmpNewCallee = $($);
const tmpIfTest = new tmpNewCallee();
if (tmpIfTest) {
  $(2);
} else {
  $(3);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
new a();
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
