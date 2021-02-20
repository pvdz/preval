# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond simple simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 ? 2 : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
a = 2;
export { a };
$(a);
`````

## Output

`````js filename=intro
const SSA_a = 2;
export { SSA_a as a };
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
