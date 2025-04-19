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
  propTDZ;
  throw `Preval: This statement contained a read that reached no writes: \$(propTDZ);`;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  propTDZ;
  throw `Preval: This statement contained a read that reached no writes: \$(propTDZ);`;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  propTDZ;
  throw "Preval: This statement contained a read that reached no writes: $(propTDZ);";
}
`````


## Todos triggered


- (todo) i think this let_hoisting case is unreachable


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
