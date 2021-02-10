# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > bindings > export > auto_ident_logic_||_simple_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 0 || $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = 0;
if (a) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
}
export { a };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
