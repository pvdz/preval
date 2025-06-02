# Preval test case

# alias_tdz.md

> If test aliased > Alias tdz
>
> let alias is read before declaration (TDZ), should NOT replace $(a)

## Input

`````js filename=intro
const c = $(true);
if (c) {
  $(a); // expect: $(a) -> TDZ
}
let a = !c;
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  throw "Preval: TDZ triggered for this read: $(a)";
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
if (c) {
  throw `Preval: TDZ triggered for this read: \$(a)`;
} else {
  let a = true;
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
