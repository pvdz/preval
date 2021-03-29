# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$({ [(a = b[$("c")])]: 10 });
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$({ [(a = b[$('c')])]: 10 });
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompProp = $('c');
const tmpSSA_a = b[tmpAssignRhsCompProp];
const tmpCalleeParam = { [tmpSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpSSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { 1: '10' }
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
