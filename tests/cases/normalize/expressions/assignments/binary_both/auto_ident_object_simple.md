# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_object_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) + (a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpNestedComplexRhs$1 = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
const tmpNestedComplexRhs = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
const tmpNestedComplexRhs$1 = { x: 1, y: 2, z: 3 };
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '[object Object][object Object]'
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
