# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident unary excl simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${!arg} after`;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$`before ${!arg} after`;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$1 = !arg;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
$(tmpCalleeParam, false);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], false
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
