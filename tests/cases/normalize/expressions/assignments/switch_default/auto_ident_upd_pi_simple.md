# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ++b;
}
$(a, b);
`````


## Settled


`````js filename=intro
$(1);
$(2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = b;
$(b, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
