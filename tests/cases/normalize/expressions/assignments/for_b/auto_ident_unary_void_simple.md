# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (; (a = void arg); $(1));
$(a, arg);
`````


## Settled


`````js filename=intro
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, 1 );
`````


## Todos triggered


- (todo) do we want to support ObjectExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
