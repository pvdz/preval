# Preval test case

# simple_simple.md

> Normalize > For > Forof > Simple simple
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a of b) $(a);
`````

## Pre Normal

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a of b) $(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
