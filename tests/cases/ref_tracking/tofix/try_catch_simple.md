# Preval test case

# try_catch_simple.md

> Ref tracking > Tofix > Try catch simple
>
>

## Input

`````js filename=intro
let x = 1;
try { fail(); x = 2; } catch { x = 3 }
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ /*truthy*/ = 2;
try {
  fail();
} catch (e) {
  x = 3;
}
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 2;
try {
  fail();
} catch (e) {
  x = 3;
}
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
try {
  fail();
}
catch (b) {
  a = 3;
}
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
try {
  fail();
  x = 2;
} catch (e) {
  x = 3;
}
$(x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

fail


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
