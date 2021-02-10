# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_and_and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $($(1)) && $($(1)) && $($(2));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
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
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
