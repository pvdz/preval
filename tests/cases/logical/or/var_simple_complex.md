# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 || $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = $(2);
}
$(x);
`````

## Output

`````js filename=intro
let x = 1;
if (x) {
} else {
  x = $(2);
}
$(x);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
