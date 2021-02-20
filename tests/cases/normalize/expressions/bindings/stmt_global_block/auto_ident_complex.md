# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = 1;

  let a = $(b);
  $(a, b);
}
`````

## Normalized

`````js filename=intro
let b = 1;
let a = $(b);
$(a, b);
`````

## Output

`````js filename=intro
const a = $(1);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
