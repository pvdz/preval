# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Let > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $(1) ? (40, 50, 60) : $($(100));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $(1) ? (40, 50, 60) : $($(100));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  xyz = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  xyz = tmpCallCallee(tmpCalleeParam);
}
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_xyz);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
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
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
