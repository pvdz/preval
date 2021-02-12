# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > bindings > export > auto_ident_cond_simple_c-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
{
  a = $(60);
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
{
  a = $(60);
}
export { a };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
