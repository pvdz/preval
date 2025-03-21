# Preval test case

# method_call_call.md

> Array > Static props > Method call call
>
> Getting the length of an array can be tricky, and sometimes be done

In this case the array escapes so we bail.

This particular case could be supported but it's probably not worth it.

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, 1, 2, 10, 20);
$(arr.length);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
$array_splice.call(arr, 1, 2, 10, 20);
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$array_splice.call([1, 2, 3], 1, 2, 10, 20);
$(3);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
arr.splice.call(arr, 1, 2, 10, 20);
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCallObj = arr.splice;
tmpCallObj.call(arr, 1, 2, 10, 20);
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$array_splice.call( a, 1, 2, 10, 20 );
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
