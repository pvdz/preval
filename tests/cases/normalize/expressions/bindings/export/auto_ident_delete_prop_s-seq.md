# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident delete prop s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

export let a = delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = delete ($(1), $(2), arg).y;
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = arg;
let a = delete tmpDeleteObj.y;
export { a };
$(a, arg);
`````

## Output


`````js filename=intro
$(1);
$(2);
const arg /*:object*/ = { y: 1 };
const a /*:boolean*/ = delete arg.y;
export { a };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = delete a.y;
export { b as a };
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
