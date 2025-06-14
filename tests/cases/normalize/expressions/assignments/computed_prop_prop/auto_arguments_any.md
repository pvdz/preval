# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = arguments)];
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
$coerce(arguments, `string`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
$coerce(arguments, `string`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
$coerce( arguments, "string" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = arguments;
const tmpCalleeParam = a;
tmpCompObj[tmpCalleeParam];
$(a);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
