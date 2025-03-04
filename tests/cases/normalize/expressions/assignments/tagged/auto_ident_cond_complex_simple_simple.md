# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $(1) ? 2 : $($(100)))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = $(1) ? 2 : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
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
let a /*:unknown*/ = 2;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCalleeParam$1 /*:unknown*/ = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$3);
  tmpCalleeParam$1 = a;
}
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
let c = 2;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
const e = [ "before ", " after" ];
$( e, c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
