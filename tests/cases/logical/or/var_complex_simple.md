# Preval test case

# var_complex_simple.md

> Logical > Or > Var complex simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) || 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
} else {
  x = 2;
}
$(x);
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
} else {
  x = 2;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
