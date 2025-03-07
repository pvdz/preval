# Preval test case

# json_parse.md

> Dot call > Json parse
>
> Make global and undo dotcall for json.parse

## Input

`````js filename=intro
const getMessages = async function($$0) {
  const D$15 = $$0;
  debugger;
  const tmpAwaitArg = fetchFromStore(D$15);
  const l$11 = await (tmpAwaitArg);
  const tmpCallCompVal = JSON.parse;
  const tmpCompObj$1 = l$11[0];
  const tmpCompObj = tmpCompObj$1.dataValues;
  const tmpCalleeParam = tmpCompObj.bucket;
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, 'parse', tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## Settled


`````js filename=intro
const getMessages /*:(unknown)=>promise*/ = async function ($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpAwaitArg /*:unknown*/ = fetchFromStore($dlr_$$0);
  const l$11 /*:unknown*/ = await tmpAwaitArg;
  const tmpCompObj$1 /*:unknown*/ = l$11[0];
  const tmpCompObj /*:unknown*/ = tmpCompObj$1.dataValues;
  const tmpCalleeParam /*:unknown*/ = tmpCompObj.bucket;
  const tmpReturnArg$13 /*:unknown*/ = $JSON_parse(tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(async function ($dlr_$$0) {
  const tmpAwaitArg = fetchFromStore($dlr_$$0);
  const tmpReturnArg$13 = $JSON_parse(await tmpAwaitArg[0].dataValues.bucket);
  return tmpReturnArg$13;
});
`````

## Pre Normal


`````js filename=intro
const getMessages = async function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const D$15 = $dlr_$$0;
  const tmpAwaitArg = fetchFromStore(D$15);
  const l$11 = await tmpAwaitArg;
  const tmpCallCompVal = JSON.parse;
  const tmpCompObj$1 = l$11[0];
  const tmpCompObj = tmpCompObj$1.dataValues;
  const tmpCalleeParam = tmpCompObj.bucket;
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, `parse`, tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## Normalized


`````js filename=intro
const getMessages = async function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const D$15 = $dlr_$$0;
  const tmpAwaitArg = fetchFromStore(D$15);
  const l$11 = await tmpAwaitArg;
  const tmpCallCompVal = $JSON_parse;
  const tmpCompObj$1 = l$11[0];
  const tmpCompObj = tmpCompObj$1.dataValues;
  const tmpCalleeParam = tmpCompObj.bucket;
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, `parse`, tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = async function($$0 ) {
  const b = $$0;
  debugger;
  const c = fetchFromStore( b );
  const d = (await (c));
  const e = d[ 0 ];
  const f = e.dataValues;
  const g = f.bucket;
  const h = $JSON_parse( g );
  return h;
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fetchFromStore

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- maybe fix the type for calling this builtin?
- inline async functions safely (because await)
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $JSON_parse