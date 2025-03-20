# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Statement > Throw > Auto ident object empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw {};
$(a);
`````


## Settled


`````js filename=intro
const tmpThrowArg /*:object*/ = {};
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpThrowArg = {};
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
throw a;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
