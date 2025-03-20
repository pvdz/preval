# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { x: { y: { z: 100 } } };

    let a = { a: 999, b: 1000 };
    a = b?.x.y.z;
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(100);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
