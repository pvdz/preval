# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Compound > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
a.b = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= { b: $(1) }));
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
const tmpBinBothRhs = { b: tmpObjLitVal };
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
SSA_a.b = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - eval returned: ("<crash[ Cannot create property 'b' on number 'NaN' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
