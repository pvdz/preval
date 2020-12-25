# Preval test case

# plus_eq.md

> normalize > compound > plus_eq
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

#TODO

## Input

`````js filename=intro
let a = $(1);
a += $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
a += $(2);
$(a);
`````

## Output

`````js filename=intro
let a = $(1);
a += $(2);
$(a);
`````