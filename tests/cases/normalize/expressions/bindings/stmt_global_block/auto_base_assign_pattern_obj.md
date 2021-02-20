# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Bindings > Stmt global block > Auto base assign pattern obj
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = {};

  let a = ({ b } = $({ b: $(2) }));
  $(a, b);
}
`````

## Normalized

`````js filename=intro
let b = {};
let a;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
$(a, b);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_b = tmpNestedAssignObjPatternRhs.b;
$(tmpNestedAssignObjPatternRhs, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
