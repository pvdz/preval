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
const tmpCalleeParam /*:regex*/ = /x/;
const stuff /*:unknown*/ = cook.match(tmpCalleeParam);
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
const stuff = document.cookie.match(/x/);
if (stuff) {
  unknown = decodeURIComponent(stuff[1]);
}
`````

## Pre Normal


`````js filename=intro
const cook = document.cookie;
const stuff = cook.match(/x/);
if (stuff) {
  const deco = decodeURIComponent(stuff[1]);
  unknown = deco;
}
`````

## Normalized


`````js filename=intro
const cook = document.cookie;
const tmpCallObj = cook;
const tmpCallVal = tmpCallObj.match;
const tmpCalleeParam = /x/;
const stuff = $dotCall(tmpCallVal, tmpCallObj, `match`, tmpCalleeParam);
if (stuff) {
  const tmpCalleeParam$1 = stuff[1];
  const deco = decodeURIComponent(tmpCalleeParam$1);
  unknown = deco;
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = document.cookie;
const b = /x/;
const c = a.match( b );
if (c) {
  const d = c[ 1 ];
  const e = decodeURIComponent( d );
  unknown = e;
}
`````

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
