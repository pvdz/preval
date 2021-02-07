# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_upd_ip_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = 1;

    let a = b++;
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpPostUpdArgIdent;
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
        tmpPostUpdArgIdent = b;
        b = b + 1;
        a = tmpPostUpdArgIdent;
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
    ('case 0:');
    {
      b = 1;
      tmpPostUpdArgIdent = b;
      b = b + 1;
      a = tmpPostUpdArgIdent;
      $(a, b);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
