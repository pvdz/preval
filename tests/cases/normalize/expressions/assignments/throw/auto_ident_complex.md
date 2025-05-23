# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (a = $(b));
$(a, b);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
