# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = (10, 20, 30) ? (40, 50, 60) : $($(100)))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = (10, 20, 30) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpIfTest = 30;
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$3);
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 60);
$(60);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 60 );
$( 60 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
