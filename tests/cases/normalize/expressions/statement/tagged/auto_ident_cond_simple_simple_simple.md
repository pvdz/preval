# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond simple simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 ? 2 : $($(100))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], 1 ? 2 : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
tmpCalleeParam$1 = 2;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 2 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
