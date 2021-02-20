# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary excl complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = !$(100);
  $(a);
}
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $(100);
let a = !tmpUnaryArg;
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
