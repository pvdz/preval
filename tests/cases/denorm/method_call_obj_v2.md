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
const stuff = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
if (stuff) {
  const tmpCallCallee = decodeURIComponent;
  const tmpCalleeParam$1 = stuff[1];
  const deco = tmpCallCallee(tmpCalleeParam$1);
  unknown = deco;
} else {
}
`````

## Output


`````js filename=intro
const cook = document.cookie;
const tmpCalleeParam /*:regex*/ = /x/;
const stuff = cook.match(tmpCalleeParam);
if (stuff) {
  const tmpCalleeParam$1 = stuff[1];
  const deco = decodeURIComponent(tmpCalleeParam$1);
  unknown = deco;
} else {
}
`````

## PST Output

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

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
