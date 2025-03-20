# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b.x = b.x = b.x = b.x = b.x = b.x = c).a;
$(a, b, c);
`````


## Settled


`````js filename=intro
(3).a;
const b /*:object*/ = { x: 3 };
$(3, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(3).a;
$(3, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
3.a;
const a = { x: 3 };
$( 3, a, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
