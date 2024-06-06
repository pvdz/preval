# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Call > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((10, 20, $(30)) ? $(2) : $($(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpCalleeParam = $(2);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(100);
  tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(2);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 = $(100);
  const tmpClusterSSA_tmpCalleeParam$1 = $(tmpCalleeParam$1);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 2 );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( d );
}
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
 - 1: 30
 - 2: 2
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
