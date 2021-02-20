# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: 1, y: 2, z: 3 } + { x: 1, y: 2, z: 3 });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
