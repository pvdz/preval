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
const arr /*:array*/ /*truthy*/ = [2];
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a[0] = 2;
  return undefined;
};
const arr = [];
arr[0] = 1;
f(arr);
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
