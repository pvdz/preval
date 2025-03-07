# Preval test case

# group_call.md

> Normalize > Member access > Assign rhs > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
let x = 10;
x = ($(1), $(2), $($)).length;
$(x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const tmpAssignRhsProp /*:unknown*/ = $($);
const x /*:unknown*/ = tmpAssignRhsProp.length;
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$($($).length);
`````

## Pre Normal


`````js filename=intro
let x = 10;
x = ($(1), $(2), $($)).length;
$(x);
`````

## Normalized


`````js filename=intro
let x = 10;
$(1);
$(2);
const tmpAssignRhsProp = $($);
x = tmpAssignRhsProp.length;
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
const b = a.length;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
