# Preval test case

# try_hell_q2.md

> Flow > Try no throw > Try hell q2
>
> Bunch of try/catch/finally cases0

Regression: it would eliminate the entire try, leaving x=0. But it must be x=1.

## Input

`````js filename=intro
let x = 0;
$inlinedFunction: {
  try {
    x = 1;
    throw `one`;
  } catch (e) {
    try {
      break $inlinedFunction;
    } catch ($finalImplicit) {
    }
  }
}
$(x);
`````


## Settled


`````js filename=intro
try {
  throw `one`;
} catch (e) {}
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `one`;
} catch (e) {}
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "one";
}
catch (a) {

}
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
$inlinedFunction: {
  try {
    x = 1;
    throw `one`;
  } catch (e) {
    break $inlinedFunction;
  }
}
$(x);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
