# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_delete_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = { y: 1 };

  let a = delete x.y;
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = { y: 1 };
  let a = delete x.y;
  $(a, x);
}
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = delete x.y;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
