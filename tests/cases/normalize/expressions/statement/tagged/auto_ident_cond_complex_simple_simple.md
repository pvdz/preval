# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$(1) ? 2 : $($(100))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $(1) ? 2 : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParam$1 = 2;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(100);
  tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(tmpCalleeParam, 2);
} else {
  const tmpCalleeParam$3 = $(100);
  tmpCalleeParam$1 = $(tmpCalleeParam$3);
  $(tmpCalleeParam, tmpCalleeParam$1);
}
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
let c = 2;
const d = $( 1 );
if (d) {
  $( b, 2 );
}
else {
  const e = $( 100 );
  c = $( e );
  $( b, c );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
