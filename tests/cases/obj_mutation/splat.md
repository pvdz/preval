# Preval test case

# splat.md

> Obj mutation > Splat
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
for (const a in blob) {
  const b = a;
  $(b);
}
$(blob);
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
for (const a in blob) {
  const b = a;
  $(b);
}
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
const tmpForInDeclRhs = blob;
let a = undefined;
for (a in tmpForInDeclRhs) {
  const b = a;
  $(b);
}
$(blob);
`````

## Output


`````js filename=intro
let a = undefined;
const blob = { thing: `woop` };
for (a in blob) {
  $(a);
}
$(blob);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { thing: "woop" };
for (a in b) {
  $( a );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'thing'
 - 2: { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
