# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > bindings > switch_case > auto_ident_ident_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1,
      c = 2;

    let a = (b = 2);
    $(a, b, c);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        b = 1;
        c = 2;
        a = undefined;
        b = 2;
        a = 2;
        $(a, b, c);
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
    ('case 0:');
    {
      b = 1;
      c = 2;
      a = undefined;
      b = 2;
      a = 2;
      $(a, b, c);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
