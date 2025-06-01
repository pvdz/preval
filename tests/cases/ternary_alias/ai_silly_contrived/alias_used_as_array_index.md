# Preval test case

# alias_used_as_array_index.md

> Ternary alias > Ai silly contrived > Alias used as array index
>
> b is used as an array index: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = a; }
let arr = [1,2,3];
let val = arr[b];
// Expect: No change, array index context is not safe
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
} else {
  b = a;
}
let arr = [1, 2, 3];
let val = arr[b];
`````


## Todos triggered


- (todo) what other ways do member expressions still appear? ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
