# Preval test case

# shift_catch.md

> Arr mutation > Shift catch
>
> Serializing an array with elided positions

## Input

`````js filename=intro
const blob = [1, 2, 3];
try {
} catch (e) {
  $('catch', blob.shift());
}
$('after', blob)
`````


## Settled


`````js filename=intro
const blob /*:array*/ = [1, 2, 3];
$(`after`, blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`after`, [1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( "after", a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'after', [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
