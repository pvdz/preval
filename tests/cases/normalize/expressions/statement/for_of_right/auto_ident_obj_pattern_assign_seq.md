# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > statement > for_of_right > auto_ident_obj_pattern_assign_seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (let x of ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  $(x_1);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x_1 = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpForOfDeclRhs = tmpNestedAssignObjPatternRhs;
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
{
  $(x_1);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x_1 = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  const tmpForOfDeclRhs = tmpNestedAssignObjPatternRhs;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
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
