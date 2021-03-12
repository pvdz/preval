# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Statement > Binary right > Auto ident opt s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) + (1, 2, b)?.x;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(100) + (1, 2, b)?.x;
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  tmpBinBothRhs = tmpChainElementObject;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  tmpBinBothRhs = tmpChainElementObject;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
