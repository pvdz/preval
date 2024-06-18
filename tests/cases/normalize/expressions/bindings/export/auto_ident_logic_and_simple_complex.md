# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident logic and simple complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = 1 && $($(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = 1 && $($(1));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = 1;
if (a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
} else {
}
export { a };
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const a = $(tmpCalleeParam);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
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
