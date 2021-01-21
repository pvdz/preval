# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
}
$(x);
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
