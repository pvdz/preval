# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond simple complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 ? $(2) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1 ? $(2) : $($(100));
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
a = $(2);
export { a };
$(a);
`````

## Output

`````js filename=intro
const SSA_a = $(2);
export { SSA_a as a };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
