# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident logic and simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && 2) + (a = 1 && 2));
$(a);
`````


## Settled


`````js filename=intro
$(4);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  a = 2;
} else {
}
const tmpBinBothLhs = a;
a = 1;
if (a) {
  a = 2;
} else {
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
