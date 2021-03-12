# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = void arg) });
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ x: (a = void arg) });
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { x: undefined };
$(tmpCalleeParam);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: 'undefined' }
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
