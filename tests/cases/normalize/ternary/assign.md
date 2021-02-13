# Preval test case

# assign.md

> normalize > ternary > assign
>
> If an assignment is a statement then a ternary should become an if-else

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
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
let a = 1;
if (2) {
  a = 3;
} else {
  a = 4;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
