# Preval test case

# return_obj.md

> Function inlining > Return obj
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return {a: 10, b: 20, c: 30};
}
$(f());
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:object*/ = { a: 10, b: 20, c: 30 };
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 10, b: 20, c: 30 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 10,
  b: 20,
  c: 30,
};
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '10', b: '20', c: '30' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
