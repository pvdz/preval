# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Let > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = arguments);
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
$(arguments);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
$(arguments);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
$( arguments );
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: '<Global Arguments>'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
