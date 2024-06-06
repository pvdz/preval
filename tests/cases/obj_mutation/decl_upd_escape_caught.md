# Preval test case

# decl_upd_escape_caught.md

> Obj mutation > Decl upd escape caught
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
function f(a) {
  blob.thing = 'boom';
}
const blob = {thing: 'woop'};
blob.thing = 'boing';
f(blob);
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
blob.thing = `boing`;
f(blob);
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
blob.thing = `boing`;
f(blob);
$(blob);
`````

## Output


`````js filename=intro
const blob = { thing: `boom` };
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { thing: "boom" };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"boom"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
