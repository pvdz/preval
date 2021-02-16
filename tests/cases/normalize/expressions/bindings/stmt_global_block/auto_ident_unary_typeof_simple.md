# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_unary_typeof_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let arg = 1;

  let a = typeof arg;
  $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = typeof arg;
$(a, arg);
`````

## Output

`````js filename=intro
let a = typeof 1;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
