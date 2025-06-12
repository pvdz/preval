# Preval test case

# if_flipping_regression.md

> Tofix > if flipping regression

it should not need the temp alias of h. if the ident crashes then so be
it but it cannot change the value of g when the call does
go through. so the alias is pointless.

## Input

`````js filename=intro
e;
const h /*:unknown*/ = f;
g;
h(e, d);
i();
l(297);
j(310);
const c /*:unknown*/ = $dotCall(a, k, undefined, b);
$(c);
`````


## Settled


`````js filename=intro
e;
const h /*:unknown*/ = f;
g;
h(e, d);
i();
l(297);
j(310);
const c /*:unknown*/ = $dotCall(a, k, undefined, b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
e;
const h = f;
g;
h(e, d);
i();
l(297);
j(310);
$($dotCall(a, k, undefined, b));
`````


## PST Settled
With rename=true

`````js filename=intro
e;
const c = f;
g;
c( e, d );
i();
l( 297 );
j( 310 );
const h = $dotCall( a, k, undefined, b );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
e;
const h = f;
g;
h(e, d);
i();
l(297);
j(310);
const c = $dotCall(a, k, undefined, b);
$(c);
`````


## Todos triggered


None


## Globals


BAD@! Found 10 implicit global bindings:

e, f, g, d, i, l, j, a, k, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
