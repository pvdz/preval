# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = void $(100)) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = void $(100)) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(100);
a = undefined;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCalleeParam = { x: undefined };
$(tmpCalleeParam);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: 'undefined' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
