# Preval test case

# _base_write_write.md

> Assigns > Base write write
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Pre Normal

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
const x = $(2);
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
