# Preval test case

# tdz_trap.md

> Tofix > tdz trap

existing test. we've regressed.

## Input

`````js filename=intro
const f = function(){ return x; };
try { 
  f();
} catch (e) { 
  $('caught the tdz error!');
}
let x = 5;
$('the end :)')
`````


## Settled


`````js filename=intro
$(`the end :)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`the end :)`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "the end :)" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  return x;
};
try {
  f();
} catch (e) {
  $(`caught the tdz error!`);
}
let x = 5;
$(`the end :)`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'caught the tdz error!'
 - 2: 'the end :)'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: BAD!!
 - !1: 'the end :)'
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'the end :)'
 - !eval returned: undefined
