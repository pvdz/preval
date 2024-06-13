# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || 2) + (0 || 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || 2) + (0 || 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = 0;
if (tmpBinBothLhs) {
} else {
  tmpBinBothLhs = 2;
}
let tmpBinBothRhs = 0;
if (tmpBinBothRhs) {
} else {
  tmpBinBothRhs = 2;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a );
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
