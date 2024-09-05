# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${{ x: 1, y: 2, z: 3 }} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], { x: 1, y: 2, z: 3 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = { x: 1, y: 2, z: 3 };
$(tmpCalleeParam, tmpCalleeParam$1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = {
  x: 1,
  y: 2,
  z: 3,
};
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
 - 1: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
