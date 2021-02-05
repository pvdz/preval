# Preval test case

# auto_ident_new_ident.md

> normalize > expressions > assignments > label > auto_ident_new_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = new $(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = new $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
