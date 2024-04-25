# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${--b} after`;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], --b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
b = b - 1;
let tmpCalleeParam$1 = b;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 0);
$(a, 0);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after" ];
$( b, 0 );
$( a, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
