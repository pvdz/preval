# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = {})["a"];
$(a);
`````


## Settled


`````js filename=intro
$Object_prototype.a;
const a /*:object*/ = {};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Object_prototype.a;
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
$Object_prototype.a;
const a = {};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
