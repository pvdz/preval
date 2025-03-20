# Preval test case

# decl_escape_caught_upd.md

> Arr mutation > Decl escape caught upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = [];
f(arr);
arr[0] = 1;
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
