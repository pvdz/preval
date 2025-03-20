# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Binary right > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = arguments));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const a /*:unknown*/ = arguments;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const a = arguments;
$(tmpBinBothLhs + a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = arguments;
const c = a + b;
$( c );
$( b );
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '100[object Arguments]'
 - 3: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
