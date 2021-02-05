# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > switch_discriminant > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch (({ b } = $({ b: $(2) }))) {
  default:
    $(100);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpSwitchTest = tmpNestedAssignObjPatternRhs;
{
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpSwitchTest = tmpNestedAssignObjPatternRhs;
$(100);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 100
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
