# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...((10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParamSpread = $(60);
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
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParamSpread = $(60);
  $(...tmpCalleeParamSpread);
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
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 60 );
  $( ... a );
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
 - 1: 30
 - 2: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
