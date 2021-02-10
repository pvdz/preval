# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = ($(1), $(2), x);
  $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x = 1;
  $(1);
  $(2);
  let a = x;
  $(a, x);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
