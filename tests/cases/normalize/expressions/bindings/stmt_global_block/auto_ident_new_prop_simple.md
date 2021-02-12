# Preval test case

# auto_ident_new_prop_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_new_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = new b.$(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b = { $: $ };
  const tmpNewCallee = b.$;
  let a = new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
{
  let b = { $: $ };
  const tmpNewCallee = b.$;
  let a = new tmpNewCallee(1);
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
