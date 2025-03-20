# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b = 2):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c);
`````


## Settled


`````js filename=intro
$(1);
$(`fail1`);
$(`fail2`);
$(2, 2, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`fail1`);
$(`fail2`);
$(2, 2, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "fail1" );
$( "fail2" );
$( 2, 2, 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
