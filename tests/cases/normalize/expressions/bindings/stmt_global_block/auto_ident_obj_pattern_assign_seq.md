# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_obj_pattern_assign_seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1,
    y = 2;

  let a = ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
  $(a, x, y);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  let y = 2;
  let a;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  a = tmpNestedAssignObjPatternRhs;
  $(a, x, y);
}
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a;
$(x);
$(y);
const tmpObjLitVal = $(3);
const tmpObjLitVal$1 = $(4);
const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
x = tmpNestedAssignObjPatternRhs.x;
y = tmpNestedAssignObjPatternRhs.y;
a = tmpNestedAssignObjPatternRhs;
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
