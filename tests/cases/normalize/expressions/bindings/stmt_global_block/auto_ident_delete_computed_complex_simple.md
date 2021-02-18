# Preval test case

# auto_ident_delete_computed_complex_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_delete_computed_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let arg = { y: 1 };

  let a = delete $(arg)["y"];
  $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
const tmpDeleteObj = $(arg);
let a = delete tmpDeleteObj.y;
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const a = delete tmpDeleteObj.y;
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
