# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > for_a > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (a = b.x = b.x = b.x = b.x = b.x = b.x = c; ; $(1));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
{
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
  a = tmpNestedPropAssignRhs$5;
  while (true) {
    $(1);
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
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
a = tmpNestedPropAssignRhs$5;
while (true) {
  $(1);
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
