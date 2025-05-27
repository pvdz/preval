# Preval test case

# tdz_pattern.md

> Tofix > tdz pattern
>
> Tricky TDZ case
> Note that block normalization causes the tdz var to be defined inside a
> new scope, leading to the early ref becoming an implicit global, which 
> triggers a different error.
> This is why singleScopeTdz is still necessary but really what it means
> is that we should update prepare to take these cases into account.

## Input

`````js filename=intro
let x = function (a, b) {
  if ($(true)) $(a === undefined ? propTDZ : a);
  return a;
  let { x: propTDZ } = b;
};
x(undefined, {x: 1});
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(propTDZ);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(propTDZ);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( propTDZ );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpCalleeParam = undefined;
    const tmpIfTest$1 = a === undefined;
    if (tmpIfTest$1) {
      tmpCalleeParam = propTDZ;
      $(propTDZ);
      return a;
    } else {
      tmpCalleeParam = a;
      $(a);
      return a;
      let tmpBindingPatternObjRoot = b;
      let propTDZ = tmpBindingPatternObjRoot.x;
      return undefined;
    }
  } else {
    return a;
  }
};
const tmpCallCallee = x;
let tmpCalleeParam$1 = { x: 1 };
x(undefined, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

propTDZ


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD!?
 -  1: true
 - !eval returned: ('<crash[ <ref> is not defined ]>')

Post settled calls: BAD!!
 -  1: true
 - !eval returned: ('<crash[ <ref> is not defined ]>')

Denormalized calls: BAD!!
 -  1: true
 - !eval returned: ('<crash[ <ref> is not defined ]>')
