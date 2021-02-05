# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_object_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { x: $(1), y: 2, z: $(3) };
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$2 = $(3);
  let a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
  $(a);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$2 = $(3);
let a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
