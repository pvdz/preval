# Preval test case

# func_nested.md

> Normalize > Optional > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
const tmpReturnArg /*:unknown*/ = $(tmpObjLitVal$1);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($()));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $( a );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
