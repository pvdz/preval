# Preval test case

# local.md

> Console > Local
>
>

## Input

`````js filename=intro
const console = {log: function(){ }};
console.log('yooo foo');
`````


## Settled


`````js filename=intro

`````


## Denormalized
(This ought to be the final result)

`````js filename=intro

`````


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function () {
  debugger;
  return undefined;
};
const console$1 = { log: tmpObjLitVal };
const tmpMCF = console$1.log;
$dotCall(tmpMCF, console$1, `log`, `yooo foo`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
