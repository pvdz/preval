# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = typeof x;
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  let a = typeof x;
  $(a, x);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
