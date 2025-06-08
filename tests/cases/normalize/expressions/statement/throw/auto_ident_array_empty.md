# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Statement > Throw > Auto ident array empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [];
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:array*/ /*truthy*/ = [];
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = [];
throw tmpThrowArg;
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
const tmpThrowArg = [];
throw tmpThrowArg;
`````


## Todos triggered


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
