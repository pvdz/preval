# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Bindings > Export > Auto ident call ident complex args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

export let a = $($(1), $(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = $($(1), $(2));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const a = $(tmpCalleeParam, tmpCalleeParam$1);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = $( a, b );
export { c as a };
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
