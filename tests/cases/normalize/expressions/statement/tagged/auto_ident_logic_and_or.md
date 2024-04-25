# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${($($(1)) && $($(1))) || $($(2))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], ($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = $(1);
let tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$5 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$5);
} else {
}
if (tmpCalleeParam$1) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$7 = $(2);
  tmpCalleeParam$1 = tmpCallCallee$5(tmpCalleeParam$7);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(1);
let tmpCalleeParam$1 = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  const tmpCalleeParam$5 = $(1);
  tmpCalleeParam$1 = $(tmpCalleeParam$5);
} else {
}
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
} else {
  const tmpCalleeParam$7 = $(2);
  tmpCalleeParam$1 = $(tmpCalleeParam$7);
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
const c = $( 1 );
let d = $( c );
if (d) {
  const e = $( 1 );
  d = $( e );
}
if (d) {
  $( b, d );
}
else {
  const f = $( 2 );
  d = $( f );
  $( b, d );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: ['before ', ' after'], 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
