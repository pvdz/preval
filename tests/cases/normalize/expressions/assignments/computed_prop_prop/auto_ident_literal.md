# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = "foo")];
$(a);
`````


## Settled


`````js filename=intro
$Object_prototype.foo;
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.foo;
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$Object_prototype.foo;
$( "foo" );
`````


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
