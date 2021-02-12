# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_object_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: $(1), y: 2, z: $(3) };
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
  let tmpObjLitVal;
  let tmpObjLitVal$1;
  let tmpObjLitVal$2;
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
      tmpObjLitVal = $(1);
      tmpObjLitVal$1 = 2;
      tmpObjLitVal$2 = $(3);
      a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
