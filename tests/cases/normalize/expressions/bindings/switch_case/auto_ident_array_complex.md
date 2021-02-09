# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_array_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = [$(1), 2, $(3)];
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpArrElement;
  let tmpArrElement$1;
  let tmpArrElement$2;
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
        tmpArrElement = $(1);
        tmpArrElement$1 = 2;
        tmpArrElement$2 = $(3);
        a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    {
      tmpArrElement = $(1);
      tmpArrElement$1 = 2;
      tmpArrElement$2 = $(3);
      a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
