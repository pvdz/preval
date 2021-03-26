# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Bindings > Export > Auto ident logic or or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = $($(0)) || $($(1)) || $($(2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = $($(0)) || $($(1)) || $($(2));
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
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
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
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  }
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
