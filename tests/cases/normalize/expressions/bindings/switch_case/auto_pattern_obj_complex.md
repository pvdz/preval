# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > bindings > switch_case > auto_pattern_obj_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let { a } = $({ a: 1, b: 2 });
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let bindingPatternObjRoot;
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
      tmpCallCallee = $;
      tmpCalleeParam = { a: 1, b: 2 };
      bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
      a = bindingPatternObjRoot.a;
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let bindingPatternObjRoot;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpCallCallee = $;
      tmpCalleeParam = { a: 1, b: 2 };
      bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
      a = bindingPatternObjRoot.a;
      $(a);
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
