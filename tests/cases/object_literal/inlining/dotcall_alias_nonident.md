# Preval test case

# dotcall_alias_nonident.md

> Object literal > Inlining > Dotcall alias nonident
>
>

## Input

`````js filename=intro
function order() {
  $($dotCall(alias, obj, undefined));
}
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = 123['f f'];
$(order);
`````

## Pre Normal


`````js filename=intro
let order = function () {
  debugger;
  $($dotCall(alias, obj, undefined));
};
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = (123)[`f f`];
$(order);
`````

## Normalized


`````js filename=intro
let order = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $dotCall(alias, obj, undefined);
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = (123)[`f f`];
$(order);
`````

## Output


`````js filename=intro
const order /*:()=>undefined*/ = function () {
  debugger;
  const tmpCalleeParam /*:unknown*/ = $dotCall(alias, obj, undefined);
  $(tmpCalleeParam);
  return undefined;
};
const g /*:()=>string*/ = function () {
  debugger;
  return `win`;
};
const obj /*:object*/ = { f: g };
const alias /*:unknown*/ = (123)[`f f`];
$(order);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $dotCall( c, d, undefined );
  $( b );
  return undefined;
};
const e = function() {
  debugger;
  return "win";
};
const d = { f: e };
const c = 123[ "f f" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
