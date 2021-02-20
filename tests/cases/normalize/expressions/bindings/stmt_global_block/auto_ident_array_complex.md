# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident array complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = [$(1), 2, $(3)];
  $(a);
}
`````

## Normalized

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$2];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
