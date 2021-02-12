# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > bindings > switch_case > auto_base_assign_pattern_obj
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = {};

    let a = ({ b } = $({ b: $(2) }));
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = {};
      a = undefined;
      const tmpCallCallee = $;
      const tmpObjLitVal = $(2);
      const tmpCalleeParam = { b: tmpObjLitVal };
      const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
      b = tmpNestedAssignObjPatternRhs.b;
      a = tmpNestedAssignObjPatternRhs;
      $(a, b);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = {};
      a = undefined;
      const tmpCallCallee = $;
      const tmpObjLitVal = $(2);
      const tmpCalleeParam = { b: tmpObjLitVal };
      const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
      b = tmpNestedAssignObjPatternRhs.b;
      a = tmpNestedAssignObjPatternRhs;
      $(a, b);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
