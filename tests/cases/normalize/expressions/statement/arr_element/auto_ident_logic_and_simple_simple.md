# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && 2) + (1 && 2);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
(1 && 2) + (1 && 2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = 1;
if (tmpBinBothLhs) {
  tmpBinBothLhs = 2;
} else {
}
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
