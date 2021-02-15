# Preval test case

# inlining_exported_constant.md

> export > inlining_exported_constant
>
> The constant is redundant but is exported. We need to properly handle that.

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Output

`````js filename=intro
const a = $(1);
const b = a;
export { b };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
