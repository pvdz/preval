# Preval test case

# ident_simple.md

> Normalize > Binding > Stmt-func-top > Ident simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = b;
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
$(2, 2, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, 2, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2, 2, 3 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2, 2, 3
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
