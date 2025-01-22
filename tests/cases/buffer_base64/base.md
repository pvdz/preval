# Preval test case

# base.md

> Buffer base64 > Base
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
const n/*:(string)=>?*/ = function ($$0) {
  const _0x1a8433/*:string*/ = $$0;
  debugger;
  Buffer; // This is part of the original pattern
  const tmpCallCompObj$23 = Buffer.from(_0x1a8433, `base64`);
  const tmpReturnArg$17 = tmpCallCompObj$23.toString(`utf8`);
  return tmpReturnArg$17;
};
$(n); // Do not inline the func
$(n("cGF0aA"))
`````

## Pre Normal


`````js filename=intro
const n = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const _0x1a8433 = $dlr_$$0;
  Buffer;
  const tmpCallCompObj$23 = Buffer.from(_0x1a8433, `base64`);
  const tmpReturnArg$17 = tmpCallCompObj$23.toString(`utf8`);
  return tmpReturnArg$17;
};
$(n);
$(n(`cGF0aA`));
`````

## Normalized


`````js filename=intro
const n = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const _0x1a8433 = $dlr_$$0;
  const tmpCallCompObj$23 = Buffer.from(_0x1a8433, `base64`);
  const tmpReturnArg$17 = tmpCallCompObj$23.toString(`utf8`);
  return tmpReturnArg$17;
};
$(n);
const tmpCallCallee = $;
const tmpCalleeParam = n(`cGF0aA`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const n /*:(unknown)=>?*/ = function ($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  const tmpCallCompObj$23 = Buffer.from($dlr_$$0, `base64`);
  const tmpReturnArg$17 = tmpCallCompObj$23.toString(`utf8`);
  return tmpReturnArg$17;
};
$(n);
$(`path`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = Buffer.from( b, "base64" );
  const e = d.toString( "utf8" );
  return e;
};
$( a );
$( "path" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'path'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
