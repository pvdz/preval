# Preval test case

# decl_upd_escape_caught.md

> Arr mutation > Decl upd escape caught
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = [];
arr[0] = 1;
f(arr);
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [2];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2 ];
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
