# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond simple s-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1 ? (40, 50, 60) : $($(100));
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
a = 60;
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = 60;
export { tmpSSA_a as a };
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
