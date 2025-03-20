# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = arguments).a;
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
a.a;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
a.a;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
a.a;
$( a );
`````


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
