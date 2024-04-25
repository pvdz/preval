# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Tagged > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${($(1), $(2), $(x))} after`;
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], ($(1), $(2), $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpCalleeParam$1 = $(x);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpCalleeParam$1 = $(1);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after" ];
$( 1 );
$( 2 );
const c = $( 1 );
$( b, c );
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
