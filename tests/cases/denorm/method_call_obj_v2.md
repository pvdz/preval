# Preval test case

# method_call_obj_v2.md

> Denorm > Method call obj v2
>
>

## Input

`````js filename=intro
const cook = document.cookie;
const stuff = cook.match(/x/);
if (stuff) {
  const deco = decodeURIComponent(stuff[1]);
  unknown = deco;
}
`````


## Settled


`````js filename=intro
const cook /*:unknown*/ = document.cookie;
const tmpCallVal /*:unknown*/ = cook.match;
const tmpCalleeParam /*:regex*/ = /x/;
const stuff /*:unknown*/ = $dotCall(tmpCallVal, cook, `match`, tmpCalleeParam);
if (stuff) {
  const tmpCalleeParam$1 /*:unknown*/ = stuff[1];
  const deco /*:string*/ = decodeURIComponent(tmpCalleeParam$1);
  unknown = deco;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cook = document.cookie;
const stuff = cook.match(/x/);
if (stuff) {
  unknown = decodeURIComponent(stuff[1]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = document.cookie;
const b = a.match;
const c = /x/;
const d = $dotCall( b, a, "match", c );
if (d) {
  const e = d[ 1 ];
  const f = decodeURIComponent( e );
  unknown = f;
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
