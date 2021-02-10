# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > do_while > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
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
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
