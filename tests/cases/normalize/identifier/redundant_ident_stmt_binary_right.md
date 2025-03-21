# Preval test case

# redundant_ident_stmt_binary_right.md

> Normalize > Identifier > Redundant ident stmt binary right
>
> When an ident statement is also the next "first" expression to be evaluated, the statement is redundant.

The idea is to leave the expression statement with just the identifier to make sure TDZ (and implicit global) errors still trigger if they would have.

However, if the next statement will immediately use them anyways, this is unnecessary.

## Input

`````js filename=intro
drop1; // Can be eliminated
1 + drop1;

drop2;
const x = 1 + drop2;
$(x);

let y = $();
drop3;
y = 1 + drop3;
$(y);
`````


## Settled


`````js filename=intro
drop1 + 0;
drop2;
const x /*:primitive*/ = 1 + drop2;
$(x);
$();
drop3;
const y /*:primitive*/ = 1 + drop3;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
drop1 + 0;
drop2;
$(1 + drop2);
$();
drop3;
$(1 + drop3);
`````


## PST Settled
With rename=true

`````js filename=intro
drop1 + 0;
drop2;
const a = 1 + drop2;
$( a );
$();
drop3;
const b = 1 + drop3;
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
