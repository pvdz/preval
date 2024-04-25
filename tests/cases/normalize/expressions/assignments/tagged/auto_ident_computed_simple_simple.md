# Preval test case

# auto_ident_computed_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = b["c"])} after`;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b[`c`]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = b.c;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = [ "before ", " after" ];
$( b, 1 );
$( 1, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
