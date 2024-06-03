# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = tmpCallCallee$3(tmpCalleeParam$1);
  if (tmpCalleeParamSpread) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$3 = $(2);
    tmpCalleeParamSpread = tmpCallCallee$5(tmpCalleeParam$3);
  } else {
  }
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
  if (tmpCalleeParamSpread) {
    const tmpCalleeParam$3 = $(2);
    tmpCalleeParamSpread = $(tmpCalleeParam$3);
  } else {
  }
}
$(...tmpCalleeParamSpread);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
$( ... b );
const e = {
a: 999,
b: 1000
;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
