# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > bindings > export > auto_ident_logic_or_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = 0 || 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = 0;
if (a) {
} else {
  a = 2;
}
export { a };
$(a);
`````

## Output

`````js filename=intro
let a = 0;
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

Normalized calls: Same

Final output calls: Same
