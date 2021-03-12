# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Switch discriminant > Auto base assign pattern obj
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

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = ({ b } = $({ b: $(2) }));
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(100);
    }
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let tmpSwitchValue;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
tmpSwitchValue = tmpNestedAssignObjPatternRhs;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_b = tmpNestedAssignObjPatternRhs.b;
$(100);
$(a, SSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 100
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
