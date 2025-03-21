# Preval test case

# redundant_ident_stmt_call.md

> Normalize > Identifier > Redundant ident stmt call
>
> When an ident statement is also the next "first" expression to be evaluated, the statement is redundant.

The idea is to leave the expression statement with just the identifier to make sure TDZ (and implicit global) errors still trigger if they would have.

However, if the next statement will immediately use them anyways, this is unnecessary.

## Input

`````js filename=intro
drop1; // Can be eliminated
drop1();

drop2;
const x = drop2();
$(x);

let y = $();
drop3;
y = drop3();
$(y);
`````


## Settled


`````js filename=intro
drop1();
const x /*:unknown*/ = drop2();
$(x);
$();
const y /*:unknown*/ = drop3();
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
drop1();
$(drop2());
$();
$(drop3());
`````


## PST Settled
With rename=true

`````js filename=intro
drop1();
const a = drop2();
$( a );
$();
const b = drop3();
$( b );
`````


## Todos triggered


None


## Globals


BAD@! Found 3 implicit global bindings:

drop1, drop2, drop3


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
