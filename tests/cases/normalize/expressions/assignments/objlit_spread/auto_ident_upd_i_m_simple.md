# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = b--) });
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
$(tmpCalleeParam);
$(1, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(1, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
$( 1, 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = tmpPostUpdArgIdent;
const tmpObjSpread = a;
let tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
