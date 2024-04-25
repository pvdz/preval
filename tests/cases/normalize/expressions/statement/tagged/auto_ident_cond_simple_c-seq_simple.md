# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond simple c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 ? (40, 50, $(60)) : $($(100))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], 1 ? (40, 50, $(60)) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
tmpCalleeParam$1 = $(60);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$1 = $(60);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after" ];
const c = $( 60 );
$( b, c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 60
 - 2: ['before ', ' after'], 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
