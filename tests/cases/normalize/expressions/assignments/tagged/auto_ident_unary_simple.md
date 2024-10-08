# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof x)} after`;
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = typeof x));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = typeof x;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, `number`);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, "number" );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 'number'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
