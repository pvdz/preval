# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Call > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(++b);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(++b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = b + 1;
let tmpCalleeParam = b;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(2);
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
