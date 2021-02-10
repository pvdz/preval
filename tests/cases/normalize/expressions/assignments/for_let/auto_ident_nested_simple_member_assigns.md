# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > assignments > for_let > auto_ident_nested_simple_member_assigns
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
for (let xyz = (a = b.x = b.x = b.x = b.x = b.x = b.x = c); ; $(1)) $(xyz);
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
{
  let xyz;
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
  xyz = tmpNestedComplexRhs;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 3
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 3
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
