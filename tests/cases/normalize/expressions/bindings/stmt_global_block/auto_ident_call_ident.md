# Preval test case

# auto_ident_call_ident.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_call_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = $(1);
  $(a);
}
`````

## Output

`````js filename=intro
let a = $(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
