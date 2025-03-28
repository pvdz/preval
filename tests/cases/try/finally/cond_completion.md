# Preval test case

# cond_completion.md

> Try > Finally > Cond completion
>
>

## Input

`````js filename=intro
function f(){
  try {
    if (a) return 1;
    if (b) throw 2;
  } finally {
    return 3;
  }
}
log(f());
`````


## Settled


`````js filename=intro
const tmpCallCallee /*:unknown*/ = log;
if (a) {
  log(3);
} else {
  b;
  tmpCallCallee(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCallee = log;
if (a) {
  log(3);
} else {
  b;
  tmpCallCallee(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const c = log;
if (a) {
  log( 3 );
}
else {
  b;
  c( 3 );
}
`````


## Todos triggered


- (todo) can we support this const aliasing blocking statement? TryStatement


## Globals


BAD@! Found 3 implicit global bindings:

log, a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
