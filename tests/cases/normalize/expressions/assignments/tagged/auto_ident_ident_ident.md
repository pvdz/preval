# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Tagged > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$`before ${(a = b = 2)} after`;
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b = 2));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
b = 2;
a = 2;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b, c);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 2);
$(2, 2, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 2 );
$( 2, 2, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
