# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Throw > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = arguments);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
throw a;
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ [object Arguments] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
