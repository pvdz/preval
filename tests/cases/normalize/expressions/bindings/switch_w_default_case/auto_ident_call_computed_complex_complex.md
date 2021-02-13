# Preval test case

# auto_ident_call_computed_complex_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_call_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)[$("$")](1);
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
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
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      b = { $: $ };
      tmpCallCompObj = $(b);
      tmpCallCompProp = $('$');
      a = tmpCallCompObj[tmpCallCompProp](1);
      $(a);
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $('fail1');
    }
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$4) {
      $('fail2');
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
  } else {
    const tmpIfTest$1 = 2 === 1;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      b = { $: $ };
      tmpCallCompObj = $(b);
      tmpCallCompProp = $('$');
      a = tmpCallCompObj[tmpCallCompProp](1);
      $(a);
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $('fail1');
    }
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$4) {
      $('fail2');
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same