# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${[$(1), 2, $(3)]} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], [$(1), 2, $(3)]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(1);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const tmpCalleeParam$1 /*:array*/ = [tmpArrElement, 2, tmpArrElement$3];
$(tmpCalleeParam, tmpCalleeParam$1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ "before ", " after" ];
const d = [ a, 2, b ];
$( c, d );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 
  ['before ', ' after'],
  [1, 2, 3],

 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
