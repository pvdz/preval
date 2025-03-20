# Preval test case

# decl_escape_upd.md

> Arr mutation > Decl escape upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
$(arr);
arr[0] = 1;
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [];
$(arr);
arr[0] = 1;
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [];
$(arr);
arr[0] = 1;
$(arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
a[0] = 1;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
