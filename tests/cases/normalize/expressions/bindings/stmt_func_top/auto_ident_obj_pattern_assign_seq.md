# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident obj pattern assign seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1,
    y = 2;

  let a = ({ x, y } = ($(x), $(y), { x: $(3), y: $(4) }));
  $(a, x, y);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
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
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  $(2);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  const SSA_x = tmpNestedAssignObjPatternRhs.x;
  const SSA_y = tmpNestedAssignObjPatternRhs.y;
  $(tmpNestedAssignObjPatternRhs, SSA_x, SSA_y);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { x: '3', y: '4' }, 3, 4
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
