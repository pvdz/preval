# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? 2 : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? 2 : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParamSpread = 2;
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
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(...2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( ...2 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( ...c );
}
const d = {
  a: 999,
  b: 1000,
};
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
