# Preval test case

# json_parse.md

> Tofix > Json parse
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
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
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
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, tmpCalleeParam);
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
  const tmpCallCompVal = JSON.parse;
  const tmpCompObj$1 = l$11[0];
  const tmpCompObj = tmpCompObj$1.dataValues;
  const tmpCalleeParam = tmpCompObj.bucket;
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## Output


`````js filename=intro
const getMessages = async function ($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  const tmpAwaitArg = fetchFromStore($dlr_$$0);
  const l$11 = await tmpAwaitArg;
  const tmpCallCompVal = JSON.parse;
  const tmpCompObj$1 = l$11[0];
  const tmpCompObj = tmpCompObj$1.dataValues;
  const tmpCalleeParam = tmpCompObj.bucket;
  const tmpReturnArg$13 = $dotCall(tmpCallCompVal, JSON, tmpCalleeParam);
  return tmpReturnArg$13;
};
$(getMessages);
`````

## PST Output

With rename=true

`````js filename=intro
const a = async function($$0 ) {
  const b = c;
  debugger;
  const d = fetchFromStore( b );
  const e = (await (d));
  const f = JSON.parse;
  const g = e[ 0 ];
  const h = g.dataValues;
  const i = h.bucket;
  const j = $dotCall( f, JSON, i );
  return j;
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

fetchFromStore

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
