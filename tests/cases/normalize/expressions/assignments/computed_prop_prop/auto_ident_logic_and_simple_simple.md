# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 1 && 2)];
$(a);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {};
obj[2];
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({}[2]);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
a[ 2 ];
$( 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
