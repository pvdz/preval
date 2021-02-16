# Preval test case

# auto_ident_arrow.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_arrow
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = () => {};
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = () => {};
  $(a);
}
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = () => {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
