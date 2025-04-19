# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = "foo")["a"];
$(a);
`````


## Settled


`````js filename=intro
$String_prototype.a;
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$String_prototype.a;
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$String_prototype.a;
$( "foo" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
