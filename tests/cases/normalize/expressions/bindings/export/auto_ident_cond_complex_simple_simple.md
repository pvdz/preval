# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond complex simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $(1) ? 2 : $($(100));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = $(1) ? 2 : $($(100));
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
export { a };
$(a);
`````

## Output


`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
export { a as a from "undefined"
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
