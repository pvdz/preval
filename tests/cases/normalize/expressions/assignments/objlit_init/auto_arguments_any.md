# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Objlit init > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = arguments) });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = arguments) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = arguments;
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a);
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: { x: '{"0":"\\"<$>\\"","1":"\\"<function>\\"","2":"\\"<function>\\"","3":"[]"}' }
 - 2: { 0: '"<$>"', 1: '"<function>"', 2: '"<function>"', 3: '[]' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
