# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > bindings > switch_case > auto_ident_new_ident_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new $($(1), $(2));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpNewCallee;
  let tmpCalleeParam;
  let tmpCalleeParam$1;
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
        tmpNewCallee = $;
        tmpCalleeParam = $(1);
        tmpCalleeParam$1 = $(2);
        a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
