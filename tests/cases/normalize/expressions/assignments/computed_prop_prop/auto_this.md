# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = this)];
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = undefined;
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
