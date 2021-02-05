# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > logic_and_left > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) && $(100);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpIfTest;
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
tmpIfTest = tmpNestedPropAssignRhs$5;
if (tmpIfTest) {
  $(100);
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
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
tmpIfTest = tmpNestedPropAssignRhs$5;
if (tmpIfTest) {
  $(100);
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
