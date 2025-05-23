# Preval test case

# iife.md

> This > Iife
>
> From the React header

## Input

`````js filename=intro
const f = function () {
  let t = $(1);
  if (t) { t = $(2); }
  if (t) {
    const g = this;
  }
}
f();
`````


## Settled


`````js filename=intro
const t /*:unknown*/ = $(1);
if (t) {
  $(2);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let t = $(1);
  if (t) {
    t = $(2);
    if (t) {
      const g = tmpPrevalAliasThis;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
