# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > assignments > for_in_right > auto_ident_arr_pattern_assign
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2,
  z = 3;

let a = { a: 999, b: 1000 };
for (let x in (a = [z, y] = [$(3), $(4)]));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let z = 3;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs;
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  z = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = 3;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs;
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  z = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: [3, 4], 1, 4, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
