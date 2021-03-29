# Preval test case

# simple_simple.md

> Normalize > For > Forin > Simple simple
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a in b) $(a);
`````

## Pre Normal

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a in b) $(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = { x: 1, y: 2 };
for (a in b) {
  $(a);
}
`````

## Output

`````js filename=intro
let a = undefined;
const b = { x: 1, y: 2 };
for (a in b) {
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
