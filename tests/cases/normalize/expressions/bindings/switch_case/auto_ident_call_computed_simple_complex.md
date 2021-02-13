# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_call_computed_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = b[$("$")](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCompObj;
  let tmpCallCompProp;
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
      b = { $: $ };
      tmpCallCompObj = b;
      tmpCallCompProp = $('$');
      a = tmpCallCompObj[tmpCallCompProp](1);
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let tmpCallCompObj;
  let tmpCallCompProp;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { $: $ };
      tmpCallCompObj = b;
      tmpCallCompProp = $('$');
      a = tmpCallCompObj[tmpCallCompProp](1);
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same