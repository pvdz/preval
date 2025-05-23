# Preval test case

# tenko_parseasync_case.md

> If test folding > Tenko parseasync case
>
> Think we already do this

## Input

`````js filename=intro
const tmpIfTest$3265 = fromStmtOrExpr$1 === 1;
if (tmpIfTest$3265) {
  tmpCalleeParam$1359 = false;
} else {
  tmpCalleeParam$1359 = true;
}
`````


## Settled


`````js filename=intro
tmpCalleeParam$1359 = fromStmtOrExpr$1 !== 1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
tmpCalleeParam$1359 = fromStmtOrExpr$1 !== 1;
`````


## PST Settled
With rename=true

`````js filename=intro
tmpCalleeParam$1359 = fromStmtOrExpr$1 !== 1;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest$3265 = fromStmtOrExpr$1 === 1;
if (tmpIfTest$3265) {
  tmpCalleeParam$1359 = false;
} else {
  tmpCalleeParam$1359 = true;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

fromStmtOrExpr$1, tmpCalleeParam$1359


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
