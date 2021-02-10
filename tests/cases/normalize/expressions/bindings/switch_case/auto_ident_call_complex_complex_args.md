# Preval test case

# auto_ident_call_complex_complex_args.md

> normalize > expressions > bindings > switch_case > auto_ident_call_complex_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $($)($(1), $(2));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let tmpCalleeParam$1;
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
        tmpCallCallee = $($);
        tmpCalleeParam = $(1);
        tmpCalleeParam$1 = $(2);
        a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
