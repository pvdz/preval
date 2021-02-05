# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > if > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = "foo"));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
a = 'foo';
tmpIfTest = 'foo';
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
a = 'foo';
tmpIfTest = 'foo';
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
