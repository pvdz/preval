# Preval test case

# decl_else_upd.md

> Obj mutation > Decl else upd
>
> Testing the inlining of objlit mutations

## Input

`````js filename=intro
const blob = {thing: 'woop'};
if ($) {
} else {
  blob.thing = 'boing';
}
$(blob);
`````

## Pre Normal

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
} else {
  blob.thing = `boing`;
}
$(blob);
`````

## Normalized

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
} else {
  blob.thing = `boing`;
}
$(blob);
`````

## Output

`````js filename=intro
const blob = { thing: `woop` };
if ($) {
} else {
  blob.thing = `boing`;
}
$(blob);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { thing: '"woop"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
