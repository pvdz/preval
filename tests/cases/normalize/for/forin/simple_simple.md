# Preval test case

# simple_complex.md

> normalize > for > forin > simple_complex
>
> For-in must be normalized

#TODO

## Input

`````js filename=intro
let a;
let b = {x: 1, y: 2}
for (a in b) $(a);
`````

## Normalized

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a in b) {
  $(a);
}
`````

## Output

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a in b) {
  $(a);
}
`````

## Result

Should call `$` with:
[['x'], ['y'], null];

Normalized calls: Same

Final output calls: Same
