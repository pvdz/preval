# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_cond_complex_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $(1) ? 2 : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
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
