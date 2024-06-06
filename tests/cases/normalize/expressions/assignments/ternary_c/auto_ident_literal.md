# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = "foo"));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  a = `foo`;
  tmpCalleeParam = `foo`;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  a = `foo`;
  $(`foo`);
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
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  a = "foo";
  $( "foo" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'foo'
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
