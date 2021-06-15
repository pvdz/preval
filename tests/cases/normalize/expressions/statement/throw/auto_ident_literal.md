# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Statement > Throw > Auto ident literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw "foo";
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw `foo`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
throw `foo`;
`````

## Output

`````js filename=intro
throw `foo`;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ foo ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
