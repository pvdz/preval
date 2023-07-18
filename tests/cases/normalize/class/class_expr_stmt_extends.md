# Preval test case

# class_expr_stmt_extends.md

> Normalize > Class > Class expr stmt extends
>
> Class expression as a statement (possible as we can see here, not the same as a decl), should be dropped entirely.

#TODO

## Input

`````js filename=intro
(class x extends $(Number) {});
`````

## Pre Normal

`````js filename=intro
(class x extends $(Number) {});
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(Number);
`````

## Output

`````js filename=intro
$(Number);
`````

## PST Output

With rename=true

`````js filename=intro
$( Number );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
