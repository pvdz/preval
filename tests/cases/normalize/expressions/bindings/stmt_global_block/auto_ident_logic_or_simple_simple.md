# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_or_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = 0 || 2;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = 0;
  if (a) {
  } else {
    a = 2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
