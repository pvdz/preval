# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = b++)} after`;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b++));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpPostUpdArgIdent = b;
b = b + 1;
a = tmpPostUpdArgIdent;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 1 );
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
