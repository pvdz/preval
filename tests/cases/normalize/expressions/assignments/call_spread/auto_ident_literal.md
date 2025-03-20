# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Call spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = "foo"));
$(a);
`````


## Settled


`````js filename=intro
$(...`foo`);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...`foo`);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ..."foo" );
$( "foo" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'f', 'o', 'o'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
