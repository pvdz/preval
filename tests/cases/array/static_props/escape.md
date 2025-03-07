# Preval test case

# escape.md

> Array > Static props > Escape
>
> Getting the length of an array can be tricky, and sometimes be done

Since anything can happen to an array when it escapes into a black hole, we must consider the array dirty.

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr); // "escaped"
$(arr.length);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
$(arr);
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
$(3);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
$(arr);
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
