# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Export > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let a = function f() {};
$(a);
`````

## Pre Normal

`````js filename=intro
let a = function f() {
  debugger;
};
export { a };
$(a);
`````

## Normalized

`````js filename=intro
let a = function f() {
  debugger;
};
export { a };
$(a);
`````

## Output

`````js filename=intro
const a = function f() {
  debugger;
};
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
