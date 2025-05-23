# Preval test case

# tdz.md

> If hoisting > Tdz
>
> Trivial case

## Input

`````js filename=intro
let x = 0;
if (fail) { // We should guard to prevent this tdz error
  x = $('do not reach me');
} else {
  x = $('do not reach me');
}
$(x);
let fail = "too late";
`````


## Settled


`````js filename=intro
throw `Preval: TDZ triggered for this read: if (fail) {`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `Preval: TDZ triggered for this read: if (fail) {`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "Preval: TDZ triggered for this read: if (fail) {";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 0;
throw `Preval: TDZ triggered for this read: if (fail) {`;
let fail = 0;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
