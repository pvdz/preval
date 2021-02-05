# Preval test case

# auto_ident_arrow.md

> normalize > expressions > statement > if > auto_ident_arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if (() => {});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = () => {};
tmpIfTest;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
() => {};
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
