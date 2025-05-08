# Preval test case

# cond_completion2.md

> Try > Finally > Cond completion2
>
>

## Options

- globals: a b

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
$(f());
`````


## Settled


`````js filename=intro
if (a) {
  $(3);
} else {
  b;
  $(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (a) {
  $(3);
} else {
  b;
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (a) {
  $( 3 );
}
else {
  b;
  $( 3 );
}
`````


## Todos triggered


None


## Globals


None (except for the 2 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 - !eval returned: ('<crash[ <ref> is not defined ]>')
