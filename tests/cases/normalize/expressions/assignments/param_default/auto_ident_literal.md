# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Param default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = "foo")) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( "foo" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
