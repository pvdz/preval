# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Throw > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = []);
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [];
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [];
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ThrowStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[  ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
