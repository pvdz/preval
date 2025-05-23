# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = {})];
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
$coerce(a, `string`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {};
$coerce(a, `string`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$coerce( a, "string" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = {};
const tmpCalleeParam = a;
tmpCompObj[tmpCalleeParam];
$(a);
`````


## Todos triggered


None


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
