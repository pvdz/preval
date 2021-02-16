# Preval test case

# auto_ident_logic_and_simple_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_logic_and_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = 1 && 2;
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = 1;
if (a) {
  a = 2;
}
$(a);
`````

## Output

`````js filename=intro
let a = 1;
if (a) {
  a = 2;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
