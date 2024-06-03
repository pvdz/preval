# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParamSpread = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam = $(100);
  tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParamSpread = 60;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(...60);
} else {
  const tmpCalleeParam = $(100);
  tmpCalleeParamSpread = $(tmpCalleeParam);
  $(...tmpCalleeParamSpread);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {
  $( ... 60 );
}
else {
  const c = $( 100 );
  a = $( c );
  $( ... a );
}
const d = {
a: 999,
b: 1000
;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
