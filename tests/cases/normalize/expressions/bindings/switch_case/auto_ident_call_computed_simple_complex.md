# Preval test case

# auto_ident_call_computed_simple_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_call_computed_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = b[$("$")](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCompObj;
  let tmpCallCompProp;
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
        b = { $: $ };
        tmpCallCompObj = b;
        tmpCallCompProp = $('$');
        a = tmpCallCompObj[tmpCallCompProp](1);
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
 - 1: '$'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
