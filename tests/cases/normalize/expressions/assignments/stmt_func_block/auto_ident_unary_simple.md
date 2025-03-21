# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1;

    let a = { a: 999, b: 1000 };
    a = typeof x;
    $(a, x);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(`number`, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number", 1 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
