# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$2 = $(3);
const tmpThrowArg = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
const tmpThrowArg = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
