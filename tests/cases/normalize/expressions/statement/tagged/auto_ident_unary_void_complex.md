# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${void $(100)} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], void $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
$(100);
const tmpCalleeParam$1 = undefined;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(100);
$(tmpCalleeParam, undefined);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ "before ", " after" ];
$( 100 );
$( b, undefined );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: ['before ', ' after'], undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
