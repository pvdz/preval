# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = [1, 2, 3]);
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
throw a;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
