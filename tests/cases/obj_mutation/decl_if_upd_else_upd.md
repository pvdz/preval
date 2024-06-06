# Preval test case

# decl_if_upd_else_upd.md

> Obj mutation > Decl if upd else upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
if ($) {
  blob.thing = 'boing';
} else {
  blob.thing = 'boing';
}
$(blob);
`````

## Pre Normal


`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
  blob.thing = `boing`;
}
$(blob);
`````

## Normalized


`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
  blob.thing = `boing`;
}
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
