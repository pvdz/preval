# Preval test case

# ident_upd_pi_simple2.md

> Normalize > Expressions > Assignments > Switch w default case test > Ident upd pi simple2
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(2)) {
  case (a = ++b):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b);
`````


## Settled


`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
$(2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
$(`fail1`);
$(`fail2`);
$(2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
$( "fail1" );
$( "fail2" );
$( 2, 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
