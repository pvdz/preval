# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_and_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $($(1)) && 2;
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    a = 2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  const tmpCalleeParam = $(1);
  let a = $(tmpCalleeParam);
  if (a) {
    a = 2;
  }
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same