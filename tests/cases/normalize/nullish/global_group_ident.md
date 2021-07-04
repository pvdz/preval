# Preval test case

# global_group_ident.md

> Normalize > Nullish > Global group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)??x
$(y);
`````

## Pre Normal

`````js filename=intro
const a = { x: 1 };
const y = (1, a) ?? x;
$(y);
`````

## Normalized

`````js filename=intro
const a = { x: 1 };
let y = a;
const tmpIfTest = y == null;
if (tmpIfTest) {
  y = x;
} else {
}
$(y);
`````

## Output

`````js filename=intro
const a = { x: 1 };
const tmpIfTest = a == null;
if (tmpIfTest) {
  x;
  $(x);
} else {
  $(a);
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
