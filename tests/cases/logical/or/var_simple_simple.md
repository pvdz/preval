# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 || 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = 2;
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = 2;
}
$(x);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
