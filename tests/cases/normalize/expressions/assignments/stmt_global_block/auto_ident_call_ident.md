# Preval test case

# auto_ident_call_ident.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_call_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
