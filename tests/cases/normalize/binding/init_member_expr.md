# Preval test case

# init_member_expr.md

> Normalize > Binding > Init member expr
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = 'foo'.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 3;
$(x);
`````

## Output

`````js filename=intro
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
