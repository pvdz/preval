# Preval test case

# decl_escape_caught_upd.md

> Obj mutation > Decl escape caught upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
function f(a) {
  blob.thing = 'boom';
}
const blob = {thing: 'woop'};
f(blob);
blob.thing = 'boing';
$(blob);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  blob.thing = `boom`;
};
const blob = { thing: `woop` };
f(blob);
blob.thing = `boing`;
$(blob);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  blob.thing = `boom`;
  return undefined;
};
const blob = { thing: `woop` };
f(blob);
blob.thing = `boing`;
$(blob);
`````

## Output


`````js filename=intro
const blob = { thing: `boing` };
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "boing" };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"boing"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
