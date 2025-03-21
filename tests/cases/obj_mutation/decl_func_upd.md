# Preval test case

# decl_func_upd.md

> Obj mutation > Decl func upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const f = function () {
  blob.thing = 'boing';
};
const blob = {thing: 'woop'};
$(f);
f();
$(blob);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  blob.thing = `boing`;
  return undefined;
};
const blob /*:object*/ = { thing: `woop` };
$(f);
blob.thing = `boing`;
$(blob);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  blob.thing = `boing`;
};
const blob = { thing: `woop` };
$(f);
blob.thing = `boing`;
$(blob);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b.thing = "boing";
  return undefined;
};
const b = { thing: "woop" };
$( a );
b.thing = "boing";
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
