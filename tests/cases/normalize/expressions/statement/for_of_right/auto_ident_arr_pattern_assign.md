# Preval test case

# auto_ident_arr_pattern_assign.md

> normalize > expressions > statement > for_of_right > auto_ident_arr_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x of ([x, y] = [$(3), $(4)]));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x_1 = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpForOfDeclRhs = tmpNestedAssignArrPatternRhs;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let y = 2;
let a = { a: 999, b: 1000 };
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x_1 = arrPatternSplat[0];
y = arrPatternSplat[1];
const tmpForOfDeclRhs = tmpNestedAssignArrPatternRhs;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
}
$(a, 1, y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
