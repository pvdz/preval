# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((a = b.c)) {
  default:
    $(100);
}
$(a, b);
`````


## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { c: 1 };
$(1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(1, { c: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { c: 1 };
$( 1, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
