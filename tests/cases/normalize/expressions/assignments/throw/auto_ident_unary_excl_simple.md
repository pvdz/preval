# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw (a = !arg);
$(a, arg);
`````


## Settled


`````js filename=intro
throw false;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw false;
`````


## PST Settled
With rename=true

`````js filename=intro
throw false;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = !arg;
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ false ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
