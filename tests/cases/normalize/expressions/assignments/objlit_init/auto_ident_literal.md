# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = "foo") });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: `foo` };
$(tmpCalleeParam);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: `foo` });
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: "foo" };
$( a );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpObjLitVal = a;
let tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"foo"' }
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
