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
for (a of b) $(a);
`````

## Normalized

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````

## Output

`````js filename=intro
let a;
let b = { x: 1, y: 2 };
for (a of b) {
  $(a);
}
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
