# Preval test case

# auto_ident_literal.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
"foo"["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
'foo'.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
'foo'.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
