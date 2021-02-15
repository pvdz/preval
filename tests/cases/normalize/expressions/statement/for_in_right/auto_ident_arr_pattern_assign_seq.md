# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> normalize > expressions > statement > for_in_right > auto_ident_arr_pattern_assign_seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x in ([x, y] = ($(x), $(y), [$(3), $(4)])));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  $(x_1);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x_1 = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpForInDeclRhs = tmpNestedAssignArrPatternRhs;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let y = 2;
let a = { a: 999, b: 1000 };
{
  $(x_1);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  x_1 = arrPatternSplat[0];
  y = arrPatternSplat[1];
  const tmpForInDeclRhs = tmpNestedAssignArrPatternRhs;
  let x_1;
  for (x_1 in tmpForInDeclRhs) {
  }
}
$(a, 1, y);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
