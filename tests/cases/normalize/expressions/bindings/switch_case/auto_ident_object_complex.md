# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_object_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = { x: $(1), y: 2, z: $(3) };
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpObjLitVal;
  let tmpObjLitVal$1;
  let tmpObjLitVal$2;
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        tmpObjLitVal = $(1);
        tmpObjLitVal$1 = 2;
        tmpObjLitVal$2 = $(3);
        a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
        $(a);
      }
      tmpFallthrough = true;
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
