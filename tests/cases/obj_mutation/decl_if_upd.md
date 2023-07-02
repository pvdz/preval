# Preval test case

# decl_if_upd.md

> Obj mutation > Decl if upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
if ($) {
  blob.thing = 'boing';
} else {
}
$(blob);
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
  blob.thing = `boing`;
} else {
}
$(blob);
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
