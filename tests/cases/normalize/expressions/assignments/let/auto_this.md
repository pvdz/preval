# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Let > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = this);
$(xyz);
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = this);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = this;
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
