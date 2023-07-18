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
let xyz = (a = undefined);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
$(undefined);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( undefined );
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
