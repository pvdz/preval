# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > compound > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$((a *= b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const varInitAssignLhsComputedRhs$5 = c;
b.x = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$4 = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$4;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
b.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
b.x = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
b.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
b.x = varInitAssignLhsComputedRhs;
const tmpBinBothRhs = varInitAssignLhsComputedRhs;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const varInitAssignLhsComputedRhs$5 = c;
b.x = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$5;
b.x = varInitAssignLhsComputedRhs$5;
a = tmpBinBothLhs * varInitAssignLhsComputedRhs$5;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
