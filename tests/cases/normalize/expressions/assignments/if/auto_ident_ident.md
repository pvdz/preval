# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > if > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
if ((a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
a = b;
tmpIfTest = b;
tmpIfTest;
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
a = 1;
tmpIfTest = 1;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
