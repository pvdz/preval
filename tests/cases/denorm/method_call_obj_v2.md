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
const tmpMCF /*:unknown*/ = cook.match;
const tmpMCP /*:regex*/ /*truthy*/ = new $regex_constructor(`x`, ``);
const stuff /*:unknown*/ = $dotCall(tmpMCF, cook, `match`, tmpMCP);
if (stuff) {
  const tmpCalleeParam /*:unknown*/ = stuff[1];
  unknown = decodeURIComponent(tmpCalleeParam);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cook = document.cookie;
const stuff = cook.match(new $regex_constructor(`x`, ``));
if (stuff) {
  unknown = decodeURIComponent(stuff[1]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = document.cookie;
const b = a.match;
const c = new $regex_constructor( "x", "" );
const d = $dotCall( b, a, "match", c );
if (d) {
  const e = d[ 1 ];
  unknown = decodeURIComponent( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const cook = document.cookie;
const tmpMCF = cook.match;
const tmpMCP = new $regex_constructor(`x`, ``);
const stuff = $dotCall(tmpMCF, cook, `match`, tmpMCP);
if (stuff) {
  let tmpCalleeParam = stuff[1];
  const deco = decodeURIComponent(tmpCalleeParam);
  unknown = deco;
} else {
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
