# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = "foo";
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = `foo`;
$(a);
`````

## Output

`````js filename=intro
$(`foo`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
