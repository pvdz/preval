# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = $(60);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee$1(tmpCalleeParam);
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  a = $(60);
  $(...a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  a = $(tmpCalleeParam);
  $(...a);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 60 );
  $( ...a );
}
else {
  const c = $( 100 );
  a = $( c );
  $( ...a );
}
$( a );
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
