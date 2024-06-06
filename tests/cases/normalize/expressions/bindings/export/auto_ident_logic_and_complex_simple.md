# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $($(1)) && 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $($(1)) && 2;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let a = tmpCallCallee(tmpCalleeParam);
if (a) {
  a = 2;
} else {
}
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
let a = $(tmpCalleeParam);
if (a) {
  a = 2;
} else {
}
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  b = 2;
}
export { b as a };
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
