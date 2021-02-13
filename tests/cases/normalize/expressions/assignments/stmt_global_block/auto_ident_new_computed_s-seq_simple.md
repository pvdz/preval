# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_new_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = new (1, 2, b)["$"](1);
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
  a = new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
{
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same