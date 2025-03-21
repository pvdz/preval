# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto arguments length
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
const obj /*:object*/ = {};
obj[a];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
({}[a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
const b = {};
b[ a ];
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
