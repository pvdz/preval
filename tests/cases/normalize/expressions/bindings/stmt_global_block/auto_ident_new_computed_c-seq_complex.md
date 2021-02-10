# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_new_computed_c-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = new (1, 2, $(b))[$("$")](1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { $: $ };
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  let a = new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
