# Preval test case

# var_simple_complex.md

> Logical > Or > Var simple complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 || $(2);
$(x);
`````

## Pre Normal

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

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
