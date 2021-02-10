# Preval test case

# auto_ident_new_prop_s-seq.md

> normalize > expressions > statement > stmt_global_block > auto_ident_new_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  new (1, 2, b).$(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
