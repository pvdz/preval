# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = -arg)} after`;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = -arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = -arg;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, -1);
$(-1, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], -1
 - 2: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
