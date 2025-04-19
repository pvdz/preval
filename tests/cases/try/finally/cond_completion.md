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
log;
if (a) {
  log(3);
} else {
  b;
  log(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
log;
if (a) {
  log(3);
} else {
  b;
  log(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
log;
if (a) {
  log( 3 );
}
else {
  b;
  log( 3 );
}
`````


## Todos triggered


None


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
