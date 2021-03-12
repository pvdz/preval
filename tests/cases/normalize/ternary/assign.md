# Preval test case

# assign.md

> Normalize > Ternary > Assign
>
> If an assignment is a statement then a ternary should become an if-else

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
a = b ? c : d;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1,
  b = 2,
  c = 3,
  d = 4;
a = b ? c : d;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
let d = 4;
if (b) {
  a = c;
} else {
  a = d;
}
$(a);
`````

## Output

`````js filename=intro
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
