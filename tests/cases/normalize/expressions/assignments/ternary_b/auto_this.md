# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Ternary b > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = this) : $(200));
$(a);

//*/// (end of file artifact)
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = undefined) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = undefined;
  tmpCalleeParam = undefined;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = undefined;
  $(undefined);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
if (b) {
  a = undefined;
  $( undefined );
}
else {
  const c = $( 200 );
  $( c );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
