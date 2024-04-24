# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? 2 : $($(100))) + (a = $(1) ? 2 : $($(100))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? 2 : $($(100))) + (a = $(1) ? 2 : $($(100))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpBinBothLhs = a;
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  a = 2;
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(100);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
let tmpBinBothLhs = 2;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
  tmpBinBothLhs = a;
}
const tmpIfTest$1 = $(1);
let tmpCalleeParam = undefined;
if (tmpIfTest$1) {
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$3 = $(100);
  a = $(tmpCalleeParam$3);
  tmpCalleeParam = tmpBinBothLhs + a;
  $(tmpCalleeParam);
}
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
const e = $( 1 );
let f = undefined;
if (e) {
  f = c + a;
  $( f );
}
else {
  const g = $( 100 );
  a = $( g );
  f = c + a;
  $( f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 4
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
