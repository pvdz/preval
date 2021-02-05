# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > bindings > export > auto_ident_logic_and_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 && $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
if (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = 1;
if (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
