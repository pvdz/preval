# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > assignments > for_let > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = (1, 2, b).c = $(b)[$("d")]); ; $(1)) $(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  const tmpNestedAssignObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
  a = tmpNestedAssignPropRhs;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20
 - 4: 1
 - 5: 20
 - 6: 1
 - 7: 20
 - 8: 1
 - 9: 20
 - 10: 1
 - 11: 20
 - 12: 1
 - 13: 20
 - 14: 1
 - 15: 20
 - 16: 1
 - 17: 20
 - 18: 1
 - 19: 20
 - 20: 1
 - 21: 20
 - 22: 1
 - 23: 20
 - 24: 1
 - 25: 20
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
