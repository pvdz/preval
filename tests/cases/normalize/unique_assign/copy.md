# Preval test case

# copy.md

> Normalize > Unique assign > Copy
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

#TODO

## Input

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
a = $(2);
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpSSA_a = $(2);
$(tmpSSA_a);
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
