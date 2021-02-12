# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > label > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = "foo";
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = 'foo';
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = 'foo';
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
