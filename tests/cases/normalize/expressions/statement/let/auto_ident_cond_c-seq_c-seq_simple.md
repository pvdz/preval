# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Let > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  xyz = $(60);
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
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_xyz /*:unknown*/ = $(60);
  $(tmpClusterSSA_xyz);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_xyz$1 /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_xyz$1);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 60 );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( d );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
