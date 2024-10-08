# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${[1, 2, 3]} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], [1, 2, 3]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = [1, 2, 3];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = [ 1, 2, 3 ];
$( a, b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
  ['before ', ' after'],
  [1, 2, 3],

 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
