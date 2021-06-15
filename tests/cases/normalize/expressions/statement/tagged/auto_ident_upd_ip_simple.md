# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${b++} after`;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], b++);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpCalleeParam$1 = tmpPostUpdArgIdent;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
