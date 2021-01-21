# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && $(2);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
}
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = $(2);
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
