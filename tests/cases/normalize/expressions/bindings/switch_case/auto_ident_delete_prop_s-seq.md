# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_prop_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete ($(1), $(2), x).y;
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let tmpDeleteObj;
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
        x = { y: 1 };
        $(1);
        $(2);
        tmpDeleteObj = x;
        a = delete tmpDeleteObj.y;
        $(a, x);
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
      x = { y: 1 };
      $(1);
      $(2);
      tmpDeleteObj = x;
      a = delete tmpDeleteObj.y;
      $(a, x);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
