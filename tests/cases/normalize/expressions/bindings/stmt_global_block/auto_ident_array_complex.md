# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_array_complex
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
{
  const tmpArrElement = $(1);
  const tmpArrElement$1 = 2;
  const tmpArrElement$2 = $(3);
  let a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
