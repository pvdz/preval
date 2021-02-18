# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) || $(2);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
} else {
  x = $(2);
}
`````

## Output

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(2);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
