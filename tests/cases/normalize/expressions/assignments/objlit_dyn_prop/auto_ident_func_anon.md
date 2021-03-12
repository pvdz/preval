# Preval test case

# auto_ident_func_anon.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident func anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = function () {})]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = function () {})]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function () {};
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = function () {};
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 'function() {}': '10' }
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
