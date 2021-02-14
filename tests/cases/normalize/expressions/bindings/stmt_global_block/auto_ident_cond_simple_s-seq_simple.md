# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_cond_simple_s-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = 1 ? (40, 50, 60) : $($(100));
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = undefined;
  {
    a = 60;
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = undefined;
  {
    a = 60;
  }
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
