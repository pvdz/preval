# Preval test case

# static_push_one_two.md

> Arr mutation > Static push one two
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the numbers immediately.

## Input

`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2];
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2]);
`````

## Pre Normal


`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
