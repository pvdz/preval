# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = [$(1), 2, $(3)])]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = [$(1), 2, $(3)])]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const SSA_a = [tmpArrElement, 2, tmpArrElement$3];
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { '1,2,3': '10' }
 - 4: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
