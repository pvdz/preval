# Preval test case

# alias_tdz.md

> If test aliased > Alias tdz
>
> let alias is read before declaration (TDZ), should NOT replace $(a)

## Input

`````js filename=intro
if (c) {
  $(a); // expect: $(a)
}
let a = !c;
`````


## Settled


`````js filename=intro
if (c) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
} else {
  c;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
} else {
  c;
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  throw "Preval: TDZ triggered for this read: $(a)";
}
else {
  c;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (c) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
} else {
  let a = !c;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
