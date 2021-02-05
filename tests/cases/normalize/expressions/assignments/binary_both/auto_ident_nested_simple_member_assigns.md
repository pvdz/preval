# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > binary_both > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(
  (a = b.x = b.x = b.x = b.x = b.x = b.x = c) +
    (a = b.x = b.x = b.x = b.x = b.x = b.x = c)
);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
let tmpNestedAssignPropRhs;
let tmpNestedAssignPropRhs$1;
let tmpNestedAssignPropRhs$2;
let tmpNestedAssignPropRhs$3;
let tmpNestedAssignPropRhs$4;
const tmpNestedPropAssignRhs = c;
b.x = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
b.x = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
b.x = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
b.x = tmpNestedPropAssignRhs$4;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$5;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$5;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
let tmpNestedAssignPropRhs$5;
let tmpNestedAssignPropRhs$6;
let tmpNestedAssignPropRhs$7;
let tmpNestedAssignPropRhs$8;
let tmpNestedAssignPropRhs$9;
const tmpNestedPropAssignRhs$6 = c;
b.x = tmpNestedPropAssignRhs$6;
tmpNestedAssignPropRhs$9 = tmpNestedPropAssignRhs$6;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$9;
b.x = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$8 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$8;
b.x = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$7 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$7;
b.x = tmpNestedPropAssignRhs$9;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$9;
const tmpNestedPropAssignRhs$10 = tmpNestedAssignPropRhs$6;
b.x = tmpNestedPropAssignRhs$10;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$10;
const tmpNestedPropAssignRhs$11 = tmpNestedAssignPropRhs$5;
b.x = tmpNestedPropAssignRhs$11;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$11;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs;
let tmpNestedAssignPropRhs;
let tmpNestedAssignPropRhs$1;
let tmpNestedAssignPropRhs$2;
let tmpNestedAssignPropRhs$3;
let tmpNestedAssignPropRhs$4;
b.x = 3;
tmpNestedAssignPropRhs$4 = 3;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
b.x = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
b.x = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
b.x = tmpNestedPropAssignRhs$3;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
b.x = tmpNestedPropAssignRhs$4;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
b.x = tmpNestedPropAssignRhs$5;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$5;
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
let tmpBinBothRhs;
let tmpNestedComplexRhs$1;
let tmpNestedAssignPropRhs$5;
let tmpNestedAssignPropRhs$6;
let tmpNestedAssignPropRhs$7;
let tmpNestedAssignPropRhs$8;
let tmpNestedAssignPropRhs$9;
b.x = 3;
tmpNestedAssignPropRhs$9 = 3;
const tmpNestedPropAssignRhs$7 = tmpNestedAssignPropRhs$9;
b.x = tmpNestedPropAssignRhs$7;
tmpNestedAssignPropRhs$8 = tmpNestedPropAssignRhs$7;
const tmpNestedPropAssignRhs$8 = tmpNestedAssignPropRhs$8;
b.x = tmpNestedPropAssignRhs$8;
tmpNestedAssignPropRhs$7 = tmpNestedPropAssignRhs$8;
const tmpNestedPropAssignRhs$9 = tmpNestedAssignPropRhs$7;
b.x = tmpNestedPropAssignRhs$9;
tmpNestedAssignPropRhs$6 = tmpNestedPropAssignRhs$9;
const tmpNestedPropAssignRhs$10 = tmpNestedAssignPropRhs$6;
b.x = tmpNestedPropAssignRhs$10;
tmpNestedAssignPropRhs$5 = tmpNestedPropAssignRhs$10;
const tmpNestedPropAssignRhs$11 = tmpNestedAssignPropRhs$5;
b.x = tmpNestedPropAssignRhs$11;
tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$11;
a = tmpNestedComplexRhs$1;
tmpBinBothRhs = tmpNestedComplexRhs$1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 6
 - 2: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
