# Preval test case

# nested_assign.md

> Normalize > Member access > Statement > Func > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  $(obj.a.b);
}
$(f());
`````


## Settled


`````js filename=intro
$();
$(15);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(15);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$( 15 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 15
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
