# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Arr element > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = {}) + (a = {}));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = {}) + (a = {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = {};
let tmpBinBothLhs = a;
a = {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = {};
const tmpSSA_a = {};
const tmpCalleeParam = a + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '[object Object][object Object]'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
