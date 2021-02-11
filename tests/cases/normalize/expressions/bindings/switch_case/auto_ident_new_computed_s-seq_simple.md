# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_new_computed_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, b)["$"](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCompObj;
  let tmpNewCallee;
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
        tmpCompObj = b;
        tmpNewCallee = tmpCompObj.$;
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
