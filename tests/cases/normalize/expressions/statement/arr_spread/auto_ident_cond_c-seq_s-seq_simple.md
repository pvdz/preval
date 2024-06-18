# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident cond c-seq s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, $(30)) ? (40, 50, 60) : $($(100)))];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...((10, 20, $(30)) ? (40, 50, 60) : $($(100)))];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpArrElToSpread = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
}
[...tmpArrElToSpread];
$(a);
`````

## Output


`````js filename=intro
let tmpArrElToSpread = 60;
const tmpIfTest = $(30);
if (tmpIfTest) {
} else {
  const tmpCalleeParam = $(100);
  tmpArrElToSpread = $(tmpCalleeParam);
}
[...tmpArrElToSpread];
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 60;
const b = $( 30 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
[ ... a ];
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
 - 1: 30
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
