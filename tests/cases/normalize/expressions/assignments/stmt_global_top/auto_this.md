# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Stmt global top > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = this;
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
$(a);
`````

## Output

`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
