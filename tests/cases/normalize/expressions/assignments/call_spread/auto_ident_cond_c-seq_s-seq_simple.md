# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(30);
if (tmpIfTest) {
  a = 60;
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
let a = 60;
const tmpIfTest = $(30);
if (tmpIfTest) {
  $(...60);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
  $(...a);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {
  $( ... 60 );
}
else {
  const c = $( 100 );
  a = $( c );
  $( ... a );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
