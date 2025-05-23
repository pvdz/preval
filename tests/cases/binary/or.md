# Preval test case

# or.md

> Binary > Or

## Options

- globals: a b c
- skipEval

## Input

`````js filename=intro
a = b || c
`````


## Settled


`````js filename=intro
a = b;
if (a) {
} else {
  a = c;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
a = b;
if (!a) {
  a = c;
}
`````


## PST Settled
With rename=true

`````js filename=intro
a = b;
if (a) {

}
else {
  a = c;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
a = b;
if (a) {
} else {
  a = c;
}
`````


## Todos triggered


None


## Globals


None (except for the 3 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
