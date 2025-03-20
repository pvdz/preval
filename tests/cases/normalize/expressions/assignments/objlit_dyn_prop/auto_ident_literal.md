# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = "foo")]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { foo: 10 };
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ foo: 10 });
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { foo: 10 };
$( a );
$( "foo" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { foo: '10' }
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
