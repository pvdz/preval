# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) ? (40, 50, 60) : $($(100))) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = $(1) ? (40, 50, 60) : $($(100))) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 60;
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  a = tmpCallCallee$1(tmpCalleeParam$1);
}
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = 60;
const tmpIfTest = $(1);
let tmpObjLitVal = 60;
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(100);
  a = $(tmpCalleeParam$1);
  tmpObjLitVal = a;
}
const tmpCalleeParam /*:object*/ = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
let c = 60;
if (b) {

}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
const e = { x: c };
$( e );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '60' }
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
