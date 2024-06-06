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

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  blob.thing = `boing`;
};
const blob = { thing: `woop` };
$(f);
f();
$(blob);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  blob.thing = `boing`;
  return undefined;
};
const blob = { thing: `woop` };
$(f);
f();
$(blob);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  blob.thing = `boing`;
  return undefined;
};
const blob = { thing: `woop` };
$(f);
blob.thing = `boing`;
$(blob);
`````

## PST Output

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

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
