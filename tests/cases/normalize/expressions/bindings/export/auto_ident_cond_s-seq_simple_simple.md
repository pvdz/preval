# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident cond s-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = (10, 20, 30) ? $(2) : $($(100));
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
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
const a = $(2);
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
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
