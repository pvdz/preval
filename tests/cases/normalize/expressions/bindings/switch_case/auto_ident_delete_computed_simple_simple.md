# Preval test case

# auto_ident_delete_computed_simple_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_computed_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete x["y"];
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
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
        x = { y: 1 };
        a = delete x['y'];
        $(a, x);
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
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
