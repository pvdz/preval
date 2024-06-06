# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Bindings > Export > Auto ident new ident complex args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = new $($(1), $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = new $($(1), $(2));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpNewCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = new $(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = new $( a, b );
export { c as a from "undefined"
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
