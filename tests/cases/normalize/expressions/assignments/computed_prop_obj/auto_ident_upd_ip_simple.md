# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = b++)["a"];
$(a, b);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
$(1, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$(1, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
$( 1, 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let obj = {};
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = tmpPostUpdArgIdent;
const tmpCompObj = a;
tmpCompObj.a;
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
