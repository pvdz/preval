# Preval test case

# auto_ident_new_ident.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_new_ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = new $(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = new $(1);
  $(a);
}
`````

## Output

`````js filename=intro
let a = new $(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
