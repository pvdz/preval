# Preval test case

# auto_ident_unary_simple.md

> normalize > expressions > statement > let > auto_ident_unary_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
let xyz = typeof x;
$(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let xyz = typeof x;
$(xyz);
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$('number');
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
