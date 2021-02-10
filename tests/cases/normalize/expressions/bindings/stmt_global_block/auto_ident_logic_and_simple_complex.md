# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_and_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = 1 && $($(1));
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = 1;
  if (a) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    a = tmpCallCallee(tmpCalleeParam);
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
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
