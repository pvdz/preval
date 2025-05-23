# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = typeof x);
$(a, x);
`````


## Settled


`````js filename=intro
throw `number`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `number`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "number";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ number ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
