# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > bindings > export > auto_ident_cond_simple_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 ? $(2) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
{
  a = $(2);
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
a = $(2);
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
