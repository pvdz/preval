# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> normalize > expressions > assignments > for_in_right > auto_ident_arr_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 }, z = 'fail';
for (let x in (a = [z, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let z = 'fail';
{
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs;
  $(x_1);
  $(y);
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
let a = { a: 999, b: 1000 };
let z = 'fail';
{
  let tmpForInDeclRhs;
  let tmpNestedComplexRhs;
  $(x_1);
  $(y);
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
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
