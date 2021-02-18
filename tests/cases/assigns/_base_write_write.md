# Preval test case

# redundant_back2back.md

> assigns > redundant_back2back
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Output

`````js filename=intro
$(1);
const SSA_x = $(2);
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
