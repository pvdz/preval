# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = {})]);
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {};
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = [ ...a ];
$( b );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
