# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Assignments > Compound > Auto ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a *= b));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a *= b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = a * b;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_a = a * 1;
$(SSA_a);
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
