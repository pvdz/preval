# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident delete prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${delete $(arg).y} after`;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], delete $(arg).y);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpDeleteObj = $(arg);
const tmpCalleeParam$1 = delete tmpDeleteObj.y;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpDeleteObj = $(arg);
const tmpCalleeParam$1 = delete tmpDeleteObj.y;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = [ "before ", " after" ];
const d = $( a );
const e = deleted.y;
$( c, e );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: ['before ', ' after'], true
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
