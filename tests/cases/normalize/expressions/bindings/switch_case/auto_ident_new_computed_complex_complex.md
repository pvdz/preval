# Preval test case

# auto_ident_new_computed_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_new_computed_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new ($(b)[$("$")])(1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCompObj;
  let tmpCompProp;
  let tmpNewCallee;
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
        b = { $: $ };
        tmpCompObj = $(b);
        tmpCompProp = $('$');
        tmpNewCallee = tmpCompObj[tmpCompProp];
        a = new tmpNewCallee(1);
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
      b = { $: $ };
      tmpCompObj = $(b);
      tmpCompProp = $('$');
      tmpNewCallee = tmpCompObj[tmpCompProp];
      a = new tmpNewCallee(1);
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
