# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = {})) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
const a /*:object*/ /*truthy*/ = {};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
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
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
