# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = typeof arg;
  $(a, arg);
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
