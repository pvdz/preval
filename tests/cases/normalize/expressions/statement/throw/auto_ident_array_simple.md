# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [1, 2, 3];
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:array*/ = [1, 2, 3];
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = [1, 2, 3];
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
throw a;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
