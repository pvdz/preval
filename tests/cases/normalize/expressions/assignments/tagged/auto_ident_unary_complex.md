# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof $(x))} after`;
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = typeof $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(tmpCalleeParam, a);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after",, ];
const b = $( 1 );
const c = typeofb;
$( a, c );
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
