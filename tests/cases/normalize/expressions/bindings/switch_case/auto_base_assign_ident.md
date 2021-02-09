# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > bindings > switch_case > auto_base_assign_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = (b = $(2));
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
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
        b = 1;
        a = undefined;
        const tmpNestedComplexRhs = $(2);
        b = tmpNestedComplexRhs;
        a = tmpNestedComplexRhs;
        $(a, b);
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
      b = 1;
      a = undefined;
      const tmpNestedComplexRhs = $(2);
      b = tmpNestedComplexRhs;
      a = tmpNestedComplexRhs;
      $(a, b);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
