# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = "foo")) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( "foo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
const tmpSwitchDisc = a;
$(100);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
