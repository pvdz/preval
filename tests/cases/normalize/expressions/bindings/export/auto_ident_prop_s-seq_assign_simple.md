# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident prop s-seq assign simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = ((1, 2, b).c = 2);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = ((1, 2, b).c = 2);
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedRhs = 2;
varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
let a = varInitAssignLhsComputedRhs;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 2 };
const a = 2;
export { a };
$(2, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 2 };
const b = 2;
export { b as a from "undefined"
$( 2, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
