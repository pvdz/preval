# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Throw > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw (b = $(2));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(2);
throw b;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(2);
throw b;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
const tmpThrowArg = b;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
