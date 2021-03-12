# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident logic or complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $($(0)) || 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $($(0)) || 2;
export { a };
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  a = 2;
}
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
