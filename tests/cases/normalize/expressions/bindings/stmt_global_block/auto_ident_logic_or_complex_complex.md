# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_or_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $($(0)) || $($(2));
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  $(a);
}
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
