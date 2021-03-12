# Preval test case

# auto_computed_simple_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto computed simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = { b: $(1) }));
a[$("b")] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = { b: $(1) }));
a[$('b')] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $('b');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpCalleeParam = tmpBinBothLhs + SSA_a;
$(tmpCalleeParam);
const tmpAssignComMemLhsProp = $('b');
SSA_a[tmpAssignComMemLhsProp] = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: '100[object Object]'
 - 4: 'b'
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
