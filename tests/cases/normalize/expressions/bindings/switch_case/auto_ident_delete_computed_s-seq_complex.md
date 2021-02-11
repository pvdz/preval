# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_computed_s-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete ($(1), $(2), x)[$("y")];
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
  let tmpDeleteCompObj;
  let tmpDeleteCompProp;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        x = { y: 1 };
        $(1);
        $(2);
        tmpDeleteCompObj = x;
        tmpDeleteCompProp = $('y');
        a = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
