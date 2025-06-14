# Preval test case

# decl_upd_escape_caught.md

> Obj mutation > Decl upd escape caught
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
function f(a) {
  blob.thing = 'boom';
}
const blob = {thing: 'woop'};
blob.thing = 'boing';
f(blob);
$(blob);
`````


## Settled


`````js filename=intro
const blob /*:object*/ /*truthy*/ = { thing: `boom` };
$(blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ thing: `boom` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { thing: "boom" };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  blob.thing = `boom`;
  return undefined;
};
const blob = { thing: `boing` };
f(blob);
$(blob);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { thing: '"boom"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
