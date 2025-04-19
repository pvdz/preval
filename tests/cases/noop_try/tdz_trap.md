# Preval test case

# tdz_trap.md

> Noop try > Tdz trap
>
>

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
try {
  throw `Preval: This statement contained a read that reached no writes: x;`;
} catch (e) {
  $(`caught the tdz error!`);
}
$(`the end :)`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  throw `Preval: This statement contained a read that reached no writes: x;`;
} catch (e) {
  $(`caught the tdz error!`);
}
$(`the end :)`);
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  throw "Preval: This statement contained a read that reached no writes: x;";
}
catch (a) {
  $( "caught the tdz error!" );
}
$( "the end :)" );
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

Post settled calls: Same

Denormalized calls: Same
