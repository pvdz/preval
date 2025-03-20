# Preval test case

# func_nested_assign.md

> Normalize > Optional > Func nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj?.a?.b);
}
$(f());
`````


## Settled


`````js filename=intro
$();
const tmpReturnArg /*:unknown*/ = $(15);
$(tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$($(15));
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = $( 15 );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
