# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > let > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = "foo");
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
a = 'foo';
xyz = 'foo';
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz;
a = 'foo';
xyz = 'foo';
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
