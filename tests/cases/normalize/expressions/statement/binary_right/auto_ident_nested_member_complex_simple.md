# Preval test case

# auto_ident_nested_member_complex_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident nested member complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(100) + ($(b)[$("x")] = $(c)[$("y")] = d);
$(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$(100) + ($(b)[$(`x`)] = $(c)[$(`y`)] = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = d;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = varInitAssignLhsComputedRhs;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b, c, d);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
tmpBinBothLhs + 3;
$(a, b, c, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
