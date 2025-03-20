# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Throw > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
throw (a = b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
throw 3;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 3;
`````


## PST Settled
With rename=true

`````js filename=intro
throw 3;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
